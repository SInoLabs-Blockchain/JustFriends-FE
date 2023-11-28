import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "src/common/constants/route";
import { useAppDispatch, useAppSelector } from "src/data/redux/Hooks";
import { setAuth, setProfile } from "src/data/redux/auth/AuthReducer";
import { AuthRepository } from "src/data/repositories/AuthRepository";
import entryPointAbi from "src/common/abis/IEntryPoint.json";
import { ethers } from "ethers";
import {
  fillUserOp,
  getAccountInitCode,
  getCallDataAddSession,
  signUserOp,
} from "src/common/utils/wallet";
import { randomNumber } from "src/common/utils";
import Web3 from "web3";
import { BAOBAB_CONFIG } from "src/data/config/chains";
import { requestToRelayer } from "src/presentation/services";
import factoryAbi from "src/common/abis/SimpleAccountFactory.json";
import { readContract } from "@wagmi/core";
import { useWeb3Modal } from "@web3modal/react";
import { getWalletClient } from "@wagmi/core";
import { toast } from "react-toastify";
import { address } from "src/common/constants/solidityTypes";
import { LOGIN_STEPS } from "src/common/constants";
import { useLazyQuery } from "@apollo/client";
import { GET_MY_PROFILE } from "src/data/graphql/queries";
import { useAccount, useDisconnect } from "wagmi";

const useHeader = () => {
  const [openModal, setOpenModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [content, setContent] = useState("");
  const [loginStep, setLoginStep] = useState(LOGIN_STEPS.CREATE_WALLET);
  const navigate = useNavigate();
  const { accessToken, profile } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const authRepository = AuthRepository.create();
  const { open: walletConnect } = useWeb3Modal();
  const [loading, setLoading] = useState(false);
  const [timeOut, setTimeOut] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openAccountDropdown = Boolean(anchorEl);
  const { disconnect } = useDisconnect();
  const { address: walletClientAddr } = useAccount();

  const [getDetailProfile] = useLazyQuery(GET_MY_PROFILE);

  const handleClickAccount = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAccountDropdown = () => {
    setAnchorEl(null);
  };

  const onSearch = (e: any) => {
    if (e.keyCode === 13) {
      navigate(`/search/posts?keySearch=${content}`);
      e.target.blur();
    }
  };

  const onToggleModal = () => {
    setOpenModal((prev) => !prev);
    setLoginStep(LOGIN_STEPS.CREATE_WALLET);
    setOtp("");
  };

  const navigateToHome = (e: any) => {
    setContent("");
    navigate(ROUTE.HOME);
  };

  const nextStep = () => setLoginStep(LOGIN_STEPS.CREATE_PASSWORD);

  const reAuth = () => {
    if (!accessToken) {
      dispatch(setAuth(localStorage.getItem("accessToken") || ""));
    }
  };

  const getMe = async () => {
    try {
      const res = await authRepository.getMe(accessToken);
      const friendAccount = localStorage.getItem("account");
      const friendAccountInfo = JSON.parse(friendAccount || "{}");

      const { data } = await getDetailProfile({
        variables: {
          address: res?.walletAddress?.toLowerCase(),
        },
      });

      if (data) {
        const { creatorEntities, userPostEntities } = data;
        const myProfile = {
          ...res,
          totalUpvote: creatorEntities[0]?.totalUpVote || 0,
          totalDownvote: creatorEntities[0]?.totalDownVote || 0,
          totalPost: userPostEntities?.length,
        };

        dispatch(
          setProfile({
            ...myProfile,
            loading: false,
            isFriend:
              res?.walletAddress.toLowerCase() ===
              friendAccountInfo?.contractAddress?.toLowerCase(),
          })
        );
      }
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  };

  const connectWalletConnect = async () => {
    try {
      onToggleModal();
      await walletConnect();
    } catch (error) {
      onToggleModal();
      console.log({ error });
    }
  };

  const deployWallet = async (
    ownerAddress: string,
    accountAddress: string,
    privateKey: string,
    randNum: any
  ) => {
    try {
      const web3 = new Web3(process.env.REACT_APP_RPC);
      const abiEntrypoint = entryPointAbi.abi;
      const entryPointContract = new web3.eth.Contract(
        abiEntrypoint,
        `0x${process.env.REACT_APP_ENTRY_POINT_ADDRESS}`
      );
      const initCode = await getAccountInitCode(
        ownerAddress,
        `0x${process.env.REACT_APP_FACTORY_ADDRESS}`,
        randNum
      );
      const startFrom = Math.floor(Date.now() / 1e3);
      const validUntil = startFrom + 86400;
      const sessionAccount = ethers.Wallet.createRandom();
      const totalAmount = web3.utils.toBigInt("1000000000000000000");

      const callData = getCallDataAddSession({
        sessionUser: sessionAccount.address,
        startFrom,
        validUntil,
        totalAmount,
      });

      const userOp = await fillUserOp(
        {
          sender: accountAddress,
          initCode,
          callData,
          nonce: 1000,
          maxFeePerGas: 0,
          maxPriorityFeePerGas: 0,
        },
        entryPointContract
      );

      const signedUserOp = await signUserOp({
        op: {
          ...userOp,
          nonce: 1000,
        },
        privateKey,
        entryPoint: `0x${process.env.REACT_APP_ENTRY_POINT_ADDRESS}`,
        chainId: BAOBAB_CONFIG.id,
      });

      await requestToRelayer(signedUserOp);
      return {
        sessionAddress: sessionAccount.address,
        sessionPrivateKey: sessionAccount.privateKey,
        startFrom,
        validUntil,
        totalAmount,
      };
    } catch (error) {
      console.log({ error });
    }
  };

  const connectSelfDeployWallet = async () => {
    setLoading(true);
    const web3 = new Web3(process.env.REACT_APP_RPC);
    const account = localStorage.getItem("account");
    const passCode = otp;
    try {
      if (account) {
        const { contractAddress, encryptedPrivateKey } = JSON.parse(account);
        const decryptedData = await web3.eth.accounts.decrypt(
          encryptedPrivateKey,
          passCode
        );
        if (!decryptedData) {
          throw new Error("Decrypt private key failed");
        }
        const { challenge } = await authRepository.connectWallet(
          contractAddress
        );
        const signature = web3.eth.accounts.sign(
          challenge,
          decryptedData.privateKey
        );
        const res = await authRepository.login(
          contractAddress,
          signature.signature
        );
        dispatch(setAuth(res.accessToken));
        localStorage.setItem("accessToken", res.accessToken);
        onToggleModal();
        toast.success("Connect Successfully");
      } else {
        const owner = ethers.Wallet.createRandom();

        const encryptedOwnerPrivateKey = await web3.eth.accounts.encrypt(
          owner.privateKey,
          passCode
        );
        const randNum = randomNumber();
        const abiFactory = factoryAbi.abi;
        const accountAddress = (await readContract({
          address: `0x${process.env.REACT_APP_FACTORY_ADDRESS}`,
          abi: abiFactory,
          functionName: "getAddress",
          args: [owner.address, randNum],
        })) as address;
        const {
          sessionAddress,
          sessionPrivateKey,
          startFrom,
          validUntil,
          totalAmount,
        }: any = await deployWallet(
          owner.address,
          // @ts-ignore
          accountAddress,
          owner.privateKey,
          randNum
        );

        const encryptedSessionPrivateKey = await web3.eth.accounts.encrypt(
          sessionPrivateKey,
          passCode
        );
        const interval = setInterval(async () => {
          const code = await web3.eth.getCode(accountAddress);
          if (code !== "0x") clearInterval(interval);
          else {
            if (timeOut > 20) clearInterval(interval);
            setTimeOut((prev) => prev + 2);
          }
        }, 2000);
        const { challenge } = await authRepository.connectWallet(
          accountAddress
        );
        const signature = web3.eth.accounts.sign(challenge, owner.privateKey);
        const res = await authRepository.login(
          accountAddress,
          signature.signature
        );
        dispatch(setAuth(res.accessToken));
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem(
          "account",
          JSON.stringify({
            ownerAddress: owner.address,
            contractAddress: accountAddress,
            salt: 1000,
            randNum,
            encryptedPrivateKey: encryptedOwnerPrivateKey,
          })
        );
        localStorage.setItem(
          "sessionAccount",
          JSON.stringify({
            address: sessionAddress,
            encryptedPrivateKey: encryptedSessionPrivateKey,
            startFrom,
            validUntil,
            totalAmount: totalAmount.toString(),
          })
        );
        onToggleModal();
        toast.success("Connect Successfully");
      }
      setLoginStep(LOGIN_STEPS.CREATE_WALLET);
      setOtp("");
      setLoading(false);
    } catch (error) {
      console.log({ error });
      onToggleModal();
      toast.error("Connect Failed");
      setOtp("");
      setLoginStep(LOGIN_STEPS.CREATE_WALLET);
      setLoading(false);
    }
  };

  const connectWallet = async () => {
    const walletClient = await getWalletClient();

    // @ts-ignore: Unreachable code error
    const { challenge } = await authRepository.connectWallet(walletClientAddr);
    // @ts-ignore: Unreachable code error
    const signature = await walletClient?.signMessage({
      account: walletClientAddr,
      message: challenge,
    });

    const res = await authRepository.login(walletClientAddr, signature);
    dispatch(setAuth(res.accessToken));
    localStorage.setItem("accessToken", res.accessToken);
    setLoading(false);
  };

  const handleLogout = async () => {
    await Promise.all([
      disconnect(),
      localStorage.removeItem('accessToken'),
      localStorage.removeItem('account'),
      localStorage.removeItem('sessionAccount'),
      localStorage.removeItem('wagmi.wallet')
    ]);
    window.location.reload()
  };

  useEffect(() => {
    reAuth();
  }, []);

  useEffect(() => {
    getMe();
  }, [accessToken]);

  useEffect(() => {
    if (!walletClientAddr || localStorage.getItem("accessToken")) return;
    connectWallet();
  }, [walletClientAddr]);

  return {
    loginStep,
    openModal,
    address: profile?.walletAddress as `0x${string}`,
    content,
    otp,
    loading,
    openAccountDropdown,
    anchorEl,
    setOtp,
    setContent,
    nextStep,
    navigateToHome,
    onSearch,
    onToggleModal,
    connectWalletConnect,
    connectSelfDeployWallet,
    handleClickAccount,
    handleCloseAccountDropdown,
    handleLogout,
  };
};

export default useHeader;
