export const ABI_FUNCTION = {
  CREATE_ACC: {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "salt",
        type: "uint256",
      },
    ],
    name: "createAccount",
    outputs: [
      {
        internalType: "contract SimpleAccount",
        name: "ret",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  EXEC_FROM_ENTRY_POINT: {
    inputs: [
      {
        internalType: "address",
        name: "dest",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "func",
        type: "bytes",
      },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  POST_CONTENT: {
    inputs: [
      {
        internalType: "bytes32",
        name: "_contentHash",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_startedPrice",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isPaid",
        type: "bool",
      },
    ],
    name: "postContent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  VOTE_CONTENT: {
    inputs: [
      {
        internalType: "bytes32",
        name: "_contentHash",
        type: "bytes32",
      },
      {
        internalType: "enum JustFriendsInterface.VoteType",
        name: "_voteType",
        type: "uint8",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  BUY_CONTENT: {
    inputs: [
      {
        internalType: "bytes32",
        name: "_contentHash",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "buyContentAccess",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  SELL_CONTENT: {
    inputs: [
      {
        internalType: "bytes32",
        name: "_contentHash",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "sellContentAccess",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  ADD_SESSION: {
    inputs: [
      {
        internalType: "address",
        name: "sessionUser",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "startFrom",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "validUntil",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalAmount",
        type: "uint256",
      },
    ],
    name: "addSession",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  REMOVE_SESSION: {
    inputs: [
      {
        internalType: "address",
        name: "sessionUser",
        type: "address",
      },
    ],
    name: "removeSession",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  USER_OP_ABI: {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "initCode",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "callGasLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "verificationGasLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "preVerificationGas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxFeePerGas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxPriorityFeePerGas",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "paymasterAndData",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct UserOperation",
        name: "userOp",
        type: "tuple",
      },
    ],
    name: "getUserOpHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
};
