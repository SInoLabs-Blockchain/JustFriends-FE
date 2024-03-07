import { Box, Typography } from "@mui/material";
import {
  FacebookIcon,
  LinkedInIcon,
  MediumIcon,
  TwitterIcon,
  YoutubeIcon,
} from "src/presentation/theme/assets/icons";
import {
  AddressText,
  FooterContainer,
  SocialContainer,
  SocialSection,
} from "./styles";
import Logo from "src/presentation/theme/assets/images/JustFriends.png";

const Footer = () => {
  return (
    <FooterContainer>
      <Box className="footer__logo">
        <img src={Logo} alt="logo" />
        <Typography>JustFriends</Typography>
      </Box>
      <Box className="divider" />
      <SocialContainer>
        <SocialSection>
          <a
            href="https://www.facebook.com/sinolabs"
            target="_blank"
            rel="noreferrer"
          >
            <FacebookIcon />
          </a>
          <a
            href="https://twitter.com/sino_labs"
            target="_blank"
            rel="noreferrer"
          >
            <TwitterIcon />
          </a>
          <a
            href="https://www.linkedin.com/company/sino-labs/"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://www.youtube.com/@SInoLabsBlc"
            target="_blank"
            rel="noreferrer"
          >
            <YoutubeIcon />
          </a>
          <a
            href="https://www.youtube.com/@SInoLabsBlc"
            target="_blank"
            rel="noreferrer"
          >
            <MediumIcon />
          </a>
        </SocialSection>
        <AddressText>
          © S-Mart Team, Proudly Crafting Products for Ava Hackathon
        </AddressText>
      </SocialContainer>
    </FooterContainer>
  );
};

export default Footer;
