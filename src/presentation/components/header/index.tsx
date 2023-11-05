import { IconButton, TextField } from "@mui/material";
import { Logo, SearchIcon } from "src/presentation/theme/assets/icons";
import {
  ButtonContainer,
  HeaderContainer,
  LogoWrapper,
  SearchContainer,
} from "./styles";
import useHeader from "./useHeader";
import ConnectButton from "../button/ConnectButton";
import { useLocation } from "react-router-dom";
import backArrow from "src/presentation/theme/assets/icons/back.svg";

const Header = () => {
  const { content, setContent, onSearch, navigateToHome } = useHeader();
  const location = useLocation();
  const page = location.pathname.split("/")[1];
  const isSearching = page === "search";

  return (
    <HeaderContainer>
      <LogoWrapper onClick={navigateToHome}>
        {isSearching ? (
          <IconButton onClick={navigateToHome}>
            <img src={backArrow} alt="back" />
          </IconButton>
        ) : (
          <Logo />
        )}
      </LogoWrapper>
      <SearchContainer>
        <SearchIcon />
        <TextField
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Search..."
          onKeyDown={onSearch}
        />
      </SearchContainer>
      <ButtonContainer>
        <ConnectButton title={"Connect Wallet"} />
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
