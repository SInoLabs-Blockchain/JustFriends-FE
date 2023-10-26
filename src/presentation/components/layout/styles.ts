import { styled } from '@mui/material/styles';
import COLOR from 'src/presentation/theme/Color';

const StyledLayout = styled('div')({
  height: '100vh',
});

const StyledContent = styled('div')({
  minHeight: 'calc(100vh - 370px)',
  backgroundColor: COLOR.neutral.neutral_5,
});

export { StyledLayout, StyledContent };
