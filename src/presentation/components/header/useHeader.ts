import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "src/common/constants/route";

const useHeader = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

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

  return {
    content,
    setContent,
    navigateToHome,
    onSearch,
  };
};

export default useHeader;
