import {
  Avatar,
  Box,
  Button,
  IconButton,
  Skeleton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { SearchIcon } from "src/presentation/theme/assets/icons";
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
import { formatBalance, stringAvatar } from "src/common/utils";

import AccountDropdown from "./components/AccountDropdown";
import ConnectModal from "./ConnectModal";
import Logo from "src/presentation/theme/assets/images/JustFriends.png";

const Header = () => {
  const {
    openModal,
    loginStep,
    address,
    content,
    loading,
    otp,
    openAccountDropdown,
    anchorEl,
    handleLogout,
    setOtp,
    setContent,
    onSearch,
    nextStep,
    onToggleModal,
    navigateToHome,
    connectWalletConnect,
    connectSelfDeployWallet,
    handleClickAccount,
    handleCloseAccountDropdown,
  } = useHeader();
  const location = useLocation();
  const page = location.pathname.split("/")[1];
  const isSearching = page === "search";
  const { accessToken, profile } = useAppSelector((state) => state.auth);
  const { data: balance } = useBalance({
    address,
    watch: true,
  });
  const matches = useMediaQuery("(min-width: 620px)");

  return (
    <HeaderContainer>
      <LogoWrapper onClick={navigateToHome}>
        {isSearching ? (
          <IconButton onClick={navigateToHome}>
            <img src={backArrow} alt="back" />
          </IconButton>
        ) : (
          <Box className="header__logo">
            <img src={Logo} alt="logo" />
            <Typography>JustFriends</Typography>
          </Box>
        )}
      </LogoWrapper>
      {matches && (
        <SearchContainer>
          <SearchIcon />
          <TextField
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Search..."
            onKeyDown={onSearch}
            style={{ width: "100%" }}
          />
        </SearchContainer>
      )}
      <ButtonContainer>
        {accessToken ? (
          <>
            <Box className="header__account-info">
              <img
                src={
                  "https://assets.coingecko.com/coins/images/12559/standard/Avalanche_Circle_RedWhite_Trans.png?1696512369"
                }
                alt="fuji"
              />
              {profile?.loading ? (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "14px" }}
                  width="100px"
                />
              ) : (
                <Typography>
                  {formatBalance(balance?.formatted || "")}
                </Typography>
              )}
            </Box>
            <Box sx={{ cursor: "pointer" }}>
              {profile?.avatarUrl ? (
                <img
                  src={profile?.avatarUrl}
                  alt="avatar"
                  onClick={handleClickAccount}
                />
              ) : (
                <Avatar
                  {...stringAvatar(profile?.username)}
                  onClick={handleClickAccount}
                />
              )}
            </Box>
            <AccountDropdown
              anchorEl={anchorEl}
              open={openAccountDropdown}
              handleClose={handleCloseAccountDropdown}
              handleLogout={handleLogout}
            />
          </>
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
        connectWalletConnect={connectWalletConnect}
        connectSelfDeployWallet={connectSelfDeployWallet}
      />
    </HeaderContainer>
  );
};

export default Header;
