import { TextField } from '@mui/material';
import { Web3Button } from '@web3modal/react';
import { Logo, SearchIcon } from 'src/presentation/theme/assets/icons';
import {
  ButtonContainer,
  HeaderContainer,
  LogoWrapper,
  SearchContainer,
} from './styles';
import useHeader from './useHeader';

const Header = () => {
  const { content, setContent, navigateToHome } = useHeader();

  return (
    <HeaderContainer>
      <LogoWrapper onClick={navigateToHome}>
        <Logo />
      </LogoWrapper>
      <SearchContainer>
        <SearchIcon />
        <TextField
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Search...'
        />
      </SearchContainer>
      <ButtonContainer>
        <Web3Button />
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
