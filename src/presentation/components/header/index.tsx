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
import { useWeb3Modal, useWeb3ModalEvents } from "@web3modal/react";
import { AuthRepository } from "src/data/repositories/AuthRepository";
import { getWalletClient } from "@wagmi/core";
import { useAppDispatch, useAppSelector } from "src/data/redux/Hooks";
import { useBalance } from "wagmi";
import { formatBalance } from "src/common/utils";
import { setAuth } from "src/data/redux/auth/AuthReducer";
import { writeContract } from "@wagmi/core";
import JustFriendsABI from "src/common/abis/JustFriends.json";

const Header = () => {
  const { address, content, setContent, onSearch, navigateToHome } =
    useHeader();
  const location = useLocation();
  const page = location.pathname.split("/")[1];
  const isSearching = page === "search";
  const authRepository = AuthRepository.create();
  const { accessToken } = useAppSelector((state) => state.auth);
  const { data: balance } = useBalance({
    address,
    watch: true,
  });
  const dispatch = useAppDispatch();
  const matches = useMediaQuery("(max-width: 768px)");
  const { open } = useWeb3Modal();

  useWeb3ModalEvents(async (event) => {
    if (event.name === "ACCOUNT_CONNECTED") {
      try {
        const walletClient = await getWalletClient();
        // @ts-ignore: Unreachable code error
        const accounts = await walletClient?.getAddresses();
        // @ts-ignore: Unreachable code error
        const account = accounts[0];
        const { challenge } = await authRepository.connectWallet(account);
        // @ts-ignore: Unreachable code error
        const signature = await walletClient?.signMessage({
          account,
          message: challenge,
        });
        const res = await authRepository.login(account, signature);
        dispatch(setAuth(res.accessToken));
        localStorage.setItem("accessToken", res.accessToken);
        await writeContract({
          address: `0x${process.env.REACT_APP_JUST_FRIENDS_CONTRACT}`,
          abi: JustFriendsABI,
          functionName: "register",
        });
      } catch (error) {
        console.log({ error });
        // TODO: Handle login BE failed
      }
    }
  });

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
          <Button onClick={open}>
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
            openModal={open}
            title={"Connect Wallet"}
          />
        )}
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
