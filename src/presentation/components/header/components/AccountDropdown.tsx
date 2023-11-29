import { Box, Typography, useMediaQuery } from "@mui/material";
import { useAppSelector } from "src/data/redux/Hooks";
import { WalletIcon2, LogoutIcon } from "src/presentation/theme/assets/icons";
import { shortenAddress } from "src/common/utils";

import { StyledMenu } from "../styles";

interface PropTypes {
  anchorEl: any;
  open: any;
  handleClose: any;
  handleLogout: any;
}

const AccountDropdown = ({
  anchorEl,
  open,
  handleClose,
  handleLogout,
}: PropTypes) => {
  const { profile } = useAppSelector((state) => state.auth);
  const matches = useMediaQuery("(min-width: 620px)");

  return (
    <StyledMenu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <Box className="user-info__wrapper">
        <Box className="user-info">
          <WalletIcon2 />
          <Typography>
            {matches ? profile?.walletAddress : shortenAddress(profile?.walletAddress || '')}
          </Typography>
        </Box>
        <LogoutIcon
          className="logout__icon"
          onClick={handleLogout}
        />
      </Box>
    </StyledMenu>
  );
};

export default AccountDropdown;
