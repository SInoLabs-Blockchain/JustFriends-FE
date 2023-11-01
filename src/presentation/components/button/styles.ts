import styled from '@emotion/styled';
import { Button } from '@mui/material';
import COLOR from 'src/presentation/theme/Color';

type InputProps = {
  backgroundColor: string;
};

export const CustomizedButton = styled(Button)<InputProps>(
  ({ backgroundColor }) => ({
    padding: '9px 20px',
    borderRadius: '8px !important',
    textTransform: 'none',
    gap: '0 !important',
    fontFamily: 'Semibold',
    fontSize: 14,
    lineHeight: '18px',
    background: backgroundColor
      ? backgroundColor
      : 'linear-gradient(97.07deg, #217FFF 1.92%, #2BB3FF 97.47%)',
    color: COLOR.white,
    boxShadow: 'none',
  })
);
