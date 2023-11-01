import { useState } from 'react';

const useMenu = () => {
  const [checked, setChecked] = useState(false);

  return { checked, setChecked };
};

export default useMenu;
