import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from 'src/common/constants/route';

const useHeader = () => {
  const navigate = useNavigate();

  const [content, setContent] = useState('');

  const navigateToHome = () => navigate(ROUTE.HOME);

  return {
    content,
    setContent,
    navigateToHome,
  };
};

export default useHeader;
