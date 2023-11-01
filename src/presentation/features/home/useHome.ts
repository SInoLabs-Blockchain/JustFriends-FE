const useHome = () => {
  const copyAddress = async () => {
    await navigator.clipboard.writeText('This is the text to be');
  };

  return { copyAddress };
};

export default useHome;
