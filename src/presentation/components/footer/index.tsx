import { Box } from '@mui/material';
import {
  FacebookIcon,
  LinkedInIcon,
  Logo,
  MediumIcon,
  TwitterIcon,
  YoutubeIcon,
} from 'src/presentation/theme/assets/icons';
import {
  AddressText,
  FooterContainer,
  SocialContainer,
  SocialSection,
} from './styles';

const Footer = () => {
  return (
    <FooterContainer>
      <Logo />
      <Box className='divider' />
      <SocialContainer>
        <SocialSection>
          <a
            href='https://www.facebook.com/sinolabs'
            target='_blank'
            rel='noreferrer'
          >
            <FacebookIcon />
          </a>
          <a
            href='https://twitter.com/sino_labs'
            target='_blank'
            rel='noreferrer'
          >
            <TwitterIcon />
          </a>
          <a
            href='https://www.linkedin.com/company/sino-labs/'
            target='_blank'
            rel='noreferrer'
          >
            <LinkedInIcon />
          </a>
          <a
            href='https://www.youtube.com/@SInoLabsBlc'
            target='_blank'
            rel='noreferrer'
          >
            <YoutubeIcon />
          </a>
          <a
            href='https://www.youtube.com/@SInoLabsBlc'
            target='_blank'
            rel='noreferrer'
          >
            <MediumIcon />
          </a>
        </SocialSection>
        <AddressText>
          © S-Mart Team, Proudly Crafting Products for Klaymaker 2023
        </AddressText>
      </SocialContainer>
    </FooterContainer>
  );
};

export default Footer;
