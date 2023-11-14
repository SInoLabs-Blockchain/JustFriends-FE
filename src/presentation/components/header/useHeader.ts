import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "src/common/constants/route";
import { useAppDispatch, useAppSelector } from "src/data/redux/Hooks";
import { setAuth, setProfile } from "src/data/redux/auth/AuthReducer";
import { AuthRepository } from "src/data/repositories/AuthRepository";
import { useAccount } from "wagmi";
import { useWeb3ModalEvents } from "@web3modal/react";
import { getWalletClient } from "@wagmi/core";

const useHeader = () => {
  const navigate = useNavigate();
  const { address } = useAccount();
  const { accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const authRepository = AuthRepository.create();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const onSearch = (e: any) => {
    if (e.keyCode === 13) {
      navigate(`/search/posts?keySearch=${content}`);
      e.target.blur();
    }
  };

  const navigateToHome = (e: any) => {
    setContent("");
    navigate(ROUTE.HOME);
  };

  const reAuth = () => {
    if (!accessToken) {
      dispatch(setAuth(localStorage.getItem("accessToken") || ""));
    }
  };

  const getMe = async () => {
    try {
      const res = await authRepository.getMe(accessToken);
      dispatch(setProfile(res));
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    reAuth();
  }, []);

  useEffect(() => {
    getMe();
  }, [accessToken]);

  useWeb3ModalEvents(async (event) => {
    if (event.name === "ACCOUNT_CONNECTED") {
      setLoading(true);
      try {
        const walletClient = await getWalletClient();
        // @ts-ignore: Unreachable code error
        const accounts = await walletClient?.getAddresses();
        // @ts-ignore: Unreachable code error
        const account = accounts[0];
        const { challenge } = await authRepository.connectWallet(account);
        // @ts-ignore: Unreachable code error
        const signature = await walletClient?.signMessage({
          account,
          message: challenge,
        });
        const res = await authRepository.login(account, signature);
        dispatch(setAuth(res.accessToken));
        localStorage.setItem("accessToken", res.accessToken);
        setLoading(false);
      } catch (error) {
        console.log({ error });
        // TODO: Handle login BE failed
        setLoading(false);
      }
    }
  });

  return {
    loading,
    address,
    content,
    setContent,
    navigateToHome,
    onSearch,
  };
};

export default useHeader;
