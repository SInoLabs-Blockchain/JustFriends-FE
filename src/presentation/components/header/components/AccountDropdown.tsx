import { Box, MenuItem, Typography } from "@mui/material";
import { useAppSelector } from "src/data/redux/Hooks";
import { WalletIcon2, LogoutIcon } from "src/presentation/theme/assets/icons";
import { shortenAddress } from "src/common/utils";

import { StyledMenu } from "../styles";

interface PropTypes {
  anchorEl: any;
  open: any;
  handleClose: any;
}

const AccountDropdown = ({ anchorEl, open, handleClose }: PropTypes) => {
  const { profile } = useAppSelector((state) => state.auth);

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
      <MenuItem>
        <Box className="user-info">
          <WalletIcon2 />
          <Typography>
            {shortenAddress(profile?.walletAddress || "")}
          </Typography>
        </Box>
        <LogoutIcon />
      </MenuItem>
    </StyledMenu>
  );
};

export default AccountDropdown;
