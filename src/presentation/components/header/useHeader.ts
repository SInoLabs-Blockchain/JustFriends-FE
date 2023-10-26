import { useState } from 'react';

const useHeader = () => {
  const [content, setContent] = useState('');

  return {
    content,
    setContent,
  };
};

export default useHeader;
