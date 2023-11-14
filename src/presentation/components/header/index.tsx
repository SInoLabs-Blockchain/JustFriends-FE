import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
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
import { useAppSelector } from "src/data/redux/Hooks";
import { useBalance } from "wagmi";
import { formatBalance } from "src/common/utils";
import ConnectModal from "./ConnectModal";

const Header = () => {
  const {
    openModal,
    loginStep,
    address,
    content,
    loading,
    otp,
    setOtp,
    setContent,
    onSearch,
    nextStep,
    onToggleModal,
    navigateToHome,
    connectMetamask,
    connectWalletConnect,
    connectSelfDeployWallet,
  } = useHeader();
  const location = useLocation();
  const page = location.pathname.split("/")[1];
  const isSearching = page === "search";
  const { accessToken } = useAppSelector((state) => state.auth);
  console.log({ address });

  const { data: balance } = useBalance({
    address,
    watch: true,
  });
  const matches = useMediaQuery("(max-width: 768px)");

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
          style={{ width: '100%' }}
        />
      </SearchContainer>
      <ButtonContainer>
        {accessToken ? (
          <>
            <Box className="header__account-info">
              <img
                src={
                  "https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F2275886173-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fo8dCjygb765jszAbMUcT%252Ficon%252FESDHrIEI6MgYJP8Zm82T%252FKlaytn%2520logo%2520(transparent).png%3Falt%3Dmedia%26token%3Dbac8f114-f7a7-4e88-8396-75aa9cbef3e2"
                }
                alt="klaytn"
              />
              <Typography>{formatBalance(balance?.formatted || "")}</Typography>
            </Box>
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/1/1b/Trump_SQ.png"
              }
              alt="avatar"
            />
          </>
        ) : matches ? (
          <Button>
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/1/1b/Trump_SQ.png"
              }
              alt="avatar"
            />
          </Button>
        ) : (
          <ConnectButton
            address={address}
            openModal={onToggleModal}
            title={"Connect"}
          />
        )}
      </ButtonContainer>
      <ConnectModal
        otp={otp}
        step={loginStep}
        loading={loading}
        setOtp={setOtp}
        isOpen={openModal}
        onToggleModal={onToggleModal}
        nextStep={nextStep}
        connectMetamask={connectMetamask}
        connectWalletConnect={connectWalletConnect}
        connectSelfDeployWallet={connectSelfDeployWallet}
      />
    </HeaderContainer>
  );
};

export default Header;
