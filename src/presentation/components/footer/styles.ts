import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import COLOR from 'src/presentation/theme/Color';

const FooterContainer = styled('div')({
  width: '100%',
  padding: '40px 30px',
  backgroundColor: COLOR.white,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 30,

  '.divider': {
    width: '100%',
    height: 1,
    backgroundColor: COLOR.border,
  },
});

const SocialContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 24,
});

const SocialSection = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 15,
});

const AddressText = styled(Typography)({
  fontSize: 14,
  fontFamily: 'Regular',
  lineHeight: '18px',
  color: COLOR.neutral.neutral_4,
});

export { FooterContainer, SocialContainer, SocialSection, AddressText };
