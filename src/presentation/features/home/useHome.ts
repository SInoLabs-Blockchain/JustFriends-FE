import { useState } from 'react';

const useHome = () => {
  const [checked, setChecked] = useState(false);

  const copyAddress = async () => {
    await navigator.clipboard.writeText('This is the text to be');
  };

  return { checked, setChecked, copyAddress };
};

export default useHome;
