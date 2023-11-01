import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const usePostDetails = () => {
  let { id } = useParams();

  useEffect(() => {}, []);

  return {};
};

export default usePostDetails;
