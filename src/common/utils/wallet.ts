import Web3 from "web3";
import {
  hexConcat,
  hexDataSlice,
  defaultAbiCoder,
  keccak256,
} from "ethers/lib/utils";
import { ABI_FUNCTION } from "../abis";
import * as typ from "src/common/constants/solidityTypes";
import { ethers } from "ethers";
import { BAOBAB_CONFIG } from "src/data/config/chains";
import BigNumber from "bignumber.js";
import { utils, BigNumber as BigNum, Contract } from "ethers";
import { arrayify } from "@ethersproject/bytes";
import * as ethereumjs from "ethereumjs-util";
import { Buffer } from "buffer";
import { Create2Factory } from "./Create2Factory";
import { rethrow, callDataCost } from "./operationUtils";

const web3 = new Web3(process.env.REACT_APP_RPC);

export const AddressZero = ethers.constants.AddressZero;

export interface UserOperation {
  sender: typ.address;
  nonce: typ.uint256;
  initCode: typ.bytes;
  callData: typ.bytes;
  callGasLimit: typ.uint256;
  verificationGasLimit: typ.uint256;
  preVerificationGas: typ.uint256;
  maxFeePerGas: typ.uint256;
  maxPriorityFeePerGas: typ.uint256;
  paymasterAndData: typ.bytes;
  signature: typ.bytes;
}

export const DefaultsForUserOp: UserOperation = {
  sender: AddressZero,
  nonce: 0,
  initCode: "0x",
  callData: "0x",
  callGasLimit: 0,
  verificationGasLimit: 150000, // default verification gas. will add create2 cost (3200+200*length) if initCode exists
  preVerificationGas: 50000, // should also cover calldata cost.
  maxFeePerGas: 0,
  maxPriorityFeePerGas: 1e9,
  paymasterAndData: "0x",
  signature: "0x",
};

export function getAccountInitCode(
  owner: string,
  factoryAddress: any,
  salt = "0"
): any {
  return hexConcat([
    factoryAddress,
    web3.eth.abi.encodeFunctionCall(ABI_FUNCTION.CREATE_ACC, [owner, salt]),
  ]);
}

export function packUserOp(op: UserOperation, forSignature = true): string {
  if (forSignature) {
    return defaultAbiCoder.encode(
      [
        "address",
        "uint256",
        "bytes32",
        "bytes32",
        "uint256",
        "uint256",
        "uint256",
        "uint256",
        "uint256",
        "bytes32",
      ],
      [
        op.sender,
        op.nonce,
        keccak256(op.initCode),
        keccak256(op.callData),
        op.callGasLimit,
        op.verificationGasLimit,
        op.preVerificationGas,
        op.maxFeePerGas,
        op.maxPriorityFeePerGas,
        keccak256(op.paymasterAndData),
      ]
    );
  } else {
    // for the purpose of calculating gas cost encode also signature (and no keccak of bytes)
    return defaultAbiCoder.encode(
      [
        "address",
        "uint256",
        "bytes",
        "bytes",
        "uint256",
        "uint256",
        "uint256",
        "uint256",
        "uint256",
        "bytes",
        "bytes",
      ],
      [
        op.sender,
        op.nonce,
        op.initCode,
        op.callData,
        op.callGasLimit,
        op.verificationGasLimit,
        op.preVerificationGas,
        op.maxFeePerGas,
        op.maxPriorityFeePerGas,
        op.paymasterAndData,
        op.signature,
      ]
    );
  }
}

export function fillUserOpDefaults(
  op: Partial<UserOperation>,
  defaults = DefaultsForUserOp
): UserOperation {
  const partial: any = { ...op };

  // we want "item:undefined" to be used from defaults, and not override defaults, so we must explicitly
  // remove those so "merge" will succeed.
  for (const key in partial) {
    if (partial[key] == null) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete partial[key];
    }
  }
  const filled = { ...defaults, ...partial };
  return filled;
}

export async function fillUserOp(
  op: Partial<UserOperation>,
  entryPoint?: any,
  getNonceFunction = "getNonce"
): Promise<UserOperation> {
  const op1 = { ...op };
  const entryPointProvider =
    entryPoint?.provider || entryPoint?.currentProvider;
  const provider = new Web3(entryPointProvider);

  if (op.initCode != null && op.initCode !== "0x") {
    const initAddr = hexDataSlice(op1.initCode!, 0, 20);
    const initCallData = hexDataSlice(op1.initCode!, 20);
    if (op1.nonce == null) op1.nonce = 0;
    if (op1.sender == null) {
      // hack: if the init contract is our known deployer, then we know what the address would be, without a view call
      if (
        initAddr.toLowerCase() === Create2Factory.contractAddress.toLowerCase()
      ) {
        const ctr = hexDataSlice(initCallData, 32);
        const salt = hexDataSlice(initCallData, 0, 32);
        op1.sender = Create2Factory.getDeployedAddress(ctr, salt);
      } else {
        if (provider == null) throw new Error("no entrypoint/provider");
        op1.sender = await entryPoint!.callStatic
          .getSenderAddress(op1.initCode!)
          .catch((e: { errorArgs: { sender: any } }) => e.errorArgs.sender);
      }
    }

    if (op1.verificationGasLimit == null) {
      if (provider == null) throw new Error("no entrypoint/provider");

      const initEstimate = await provider.eth.estimateGas({
        from: `0x${process.env.REACT_APP_ENTRY_POINT_ADDRESS}`,
        to: initAddr,
        data: initCallData,
        gasLimit: 10e6,
      });

      op1.verificationGasLimit = BigNum.from(
        DefaultsForUserOp.verificationGasLimit
      ).add(initEstimate);
    }
  }

  if (op1.nonce == null) {
    if (provider == null)
      throw new Error("must have entryPoint to autofill nonce");
    const c = new Contract(
      op.sender!,
      [`function ${getNonceFunction}() view returns(uint256)`],
      entryPointProvider
    );
    op1.nonce = await c[getNonceFunction]().catch(rethrow());
  }

  if (op1.callGasLimit == null && op.callData != null) {
    if (provider == null)
      throw new Error("must have entryPoint for callGasLimit estimate");

    const gasEtimated = await provider.eth.estimateGas({
      from: `0x${process.env.REACT_APP_ENTRY_POINT_ADDRESS}`,
      to: op1.sender,
      // @ts-ignore
      data: op1.callData,
    });

    // console.log('estim', op1.sender,'len=', op1.callData!.length, 'res=', gasEtimated)
    // estimateGas assumes direct call from entryPoint. add wrapper cost.
    op1.callGasLimit = 400000; // .add(55000)
  }

  if (op1.maxFeePerGas == null) {
    if (provider == null)
      throw new Error("must have entryPoint to autofill maxFeePerGas");
    const block = await provider.eth.getBlock("latest");
    // op1.maxFeePerGas = block.baseFeePerGas!.add(
    //   op1.maxPriorityFeePerGas ?? DefaultsForUserOp.maxPriorityFeePerGas,
    // );
    op1.maxFeePerGas = block.baseFeePerGas;
  }
  // TODO: this is exactly what fillUserOp below should do - but it doesn't.
  // adding this manually
  if (op1.maxPriorityFeePerGas == null) {
    op1.maxPriorityFeePerGas = DefaultsForUserOp.maxPriorityFeePerGas;
  }

  const op2 = fillUserOpDefaults(op1);

  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  if (op2.preVerificationGas.toString() === "0") {
    // TODO: we don't add overhead, which is ~21000 for a single TX, but much lower in a batch.
    op2.preVerificationGas = callDataCost(packUserOp(op2, false));
  }

  return op2;
}

export function packUserOpWeb3(op: any, forSignature = true): string {
  if (forSignature) {
    return web3.eth.abi.encodeParameters(
      [
        "address",
        "uint256",
        "bytes32",
        "bytes32",
        "uint256",
        "uint256",
        "uint256",
        "uint256",
        "uint256",
        "bytes32",
      ],
      [
        op.sender,
        op.nonce,
        utils.keccak256(op.initCode),
        utils.keccak256(op.callData),
        op.callGasLimit,
        op.verificationGasLimit,
        op.preVerificationGas,
        op.maxFeePerGas,
        op.maxPriorityFeePerGas,
        utils.keccak256(op.paymasterAndData),
      ]
    );
  } else {
    // for the purpose of calculating gas cost encode also signature (and no keccak of bytes)
    return web3.eth.abi.encodeParameters(
      [
        "address",
        "uint256",
        "bytes",
        "bytes",
        "uint256",
        "uint256",
        "uint256",
        "uint256",
        "uint256",
        "bytes",
        "bytes",
      ],
      [
        op.sender,
        op.nonce,
        op.initCode,
        op.callData,
        op.callGasLimit,
        op.verificationGasLimit,
        op.preVerificationGas,
        op.maxFeePerGas,
        op.maxPriorityFeePerGas,
        op.paymasterAndData,
        op.signature,
      ]
    );
  }
}

function getRequestIdWeb3(op: any, entryPointAgr: any, chainIdAgr: any) {
  const userOpHash = Web3.utils.keccak256(packUserOpWeb3(op));

  const enc = web3.eth.abi.encodeParameters(
    ["bytes32", "address", "uint256"],
    [userOpHash, entryPointAgr, chainIdAgr]
  );
  return Web3.utils.keccak256(enc);
}

export function tnxIdToNonce(tnxId: any) {
  return new BigNumber(tnxId)
    .multipliedBy(new BigNumber(2).pow(64))
    .toString(10);
}

export async function signUserOp({
  op,
  privateKey,
  entryPoint,
  chainId = BAOBAB_CONFIG.id,
  sessionUser,
}: any) {
  // Define the range
  const min = new BigNumber(100000);
  const maxPower = new BigNumber(2).pow(64);
  const max = maxPower.minus(1); // We subtract 1 to stay within the specified range
  // Generate a random value between 0 and 1
  const randomValue = new BigNumber(Math.random());
  // Scale the random value to the desired range
  const scaledValue = randomValue.times(max.minus(min)).plus(min);
  // Convert the scaled value to an integer
  const randomInteger = scaledValue.integerValue(BigNumber.ROUND_FLOOR);
  const newOp = {
    ...op,
    callGasLimit: op.callGasLimit.toString(),
    maxFeePerGas: op.maxFeePerGas.toString(),
    verificationGasLimit: "1000000",
    nonce: tnxIdToNonce(randomInteger),
  };
  const message = getRequestIdWeb3({ ...newOp }, entryPoint, chainId);
  const msg = Buffer.concat([
    Buffer.from("\x19Ethereum Signed Message:\n32", "ascii"),
    Buffer.from(arrayify(message)),
  ]);
  const sig = ethereumjs.ecsign(
    ethereumjs.keccak256(msg),
    Buffer.from(arrayify(privateKey))
  );
  const signedMessage = ethereumjs.toRpcSig(sig.v, sig.r, sig.s);
  let res = signedMessage;
  if (sessionUser) {
    res = hexConcat([sessionUser, signedMessage]);
  }
  return {
    ...newOp,
    signature: sessionUser ? res : signedMessage,
  };
}

export const getCallDataAddSession = ({
  sessionUser,
  startFrom,
  validUntil,
  totalAmount,
}: any) => {
  const msgData = web3.eth.abi.encodeFunctionCall(ABI_FUNCTION.ADD_SESSION, [
    sessionUser,
    startFrom,
    validUntil,
    totalAmount,
  ]);
  return msgData;
};

export const getCallDataCreatePost = ({
  contentHash,
  startedPrice,
  isPaid,
}: any) => {
  const msgData = web3.eth.abi.encodeFunctionCall(ABI_FUNCTION.POST_CONTENT, [
    contentHash,
    startedPrice,
    isPaid,
  ]);
  return msgData;
};

export const getCallDataVotePost = ({ contentHash, voteType }: any) => {
  const msgData = web3.eth.abi.encodeFunctionCall(ABI_FUNCTION.VOTE_CONTENT, [
    contentHash,
    voteType,
  ]);
  return msgData;
};

export const getCallDataPurchasePost = ({ contentHash, amount }: any) => {
  const msgData = web3.eth.abi.encodeFunctionCall(ABI_FUNCTION.BUY_CONTENT, [
    contentHash,
    amount,
  ]);
  return msgData;
};

export const getCallDataSellPost = ({ contentHash, amount }: any) => {
  const msgData = web3.eth.abi.encodeFunctionCall(ABI_FUNCTION.SELL_CONTENT, [
    contentHash,
    amount,
  ]);
  return msgData;
};

export const getCallDataEntryPoint = ({
  value,
  target,
  msgDataEncode,
}: any) => {
  const msgData = web3.eth.abi.encodeFunctionCall(
    ABI_FUNCTION.EXEC_FROM_ENTRY_POINT,
    [target, value, msgDataEncode]
  );
  return msgData;
};
