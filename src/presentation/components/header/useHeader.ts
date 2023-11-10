import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "src/common/constants/route";
import { useAppDispatch, useAppSelector } from "src/data/redux/Hooks";
import { setAuth, setProfile } from "src/data/redux/auth/AuthReducer";
import { AuthRepository } from "src/data/repositories/AuthRepository";
import { useAccount } from "wagmi";

const useHeader = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { address } = useAccount();
  const { accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const authRepository = AuthRepository.create();

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

  return {
    address,
    content,
    setContent,
    navigateToHome,
    onSearch,
  };
};

export default useHeader;
