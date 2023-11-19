import { CircularProgress } from "@mui/material";
import { LoadingWrapper } from "./styles";

interface PropTypes {
  size: number;
  thickness: number;
}

const Loading = ({ size, thickness }: PropTypes) => {
  return (
    <LoadingWrapper>
      <CircularProgress size={size} thickness={thickness} />
    </LoadingWrapper>
  );
};

export default Loading;
