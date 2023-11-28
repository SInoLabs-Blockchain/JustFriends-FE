import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";

import { CloseIcon } from "src/presentation/theme/assets/icons";
import { ModalContainer } from "./styles";
import WalletConnectIcon from "src/presentation/theme/assets/icons/walletconnect-icon.svg";
import JustFriendIcon from "src/presentation/theme/assets/icons/justfriends-icon.svg";
import OtpInput from "react-otp-input";
import CustomButton from "../button";
import { LOGIN_STEPS } from "src/common/constants";
interface IProps {
  step: number;
  isOpen: boolean;
  onToggleModal: any;
  connectWalletConnect: any;
  connectSelfDeployWallet: any;
  otp: string;
  setOtp: any;
  nextStep: any;
  loading: boolean;
}

const ConnectModal = (props: IProps) => {
  const {
    step,
    isOpen,
    onToggleModal,
    connectWalletConnect,
    connectSelfDeployWallet,
    otp,
    setOtp,
    nextStep,
    loading,
  } = props;

  const handlePaste: React.ClipboardEventHandler = (event) => {
    const data = event.clipboardData.getData("text");
    setOtp(data);
  };
  const account = localStorage.getItem("account");

  const renderModalTitle = () => {
    if (step === LOGIN_STEPS.CREATE_WALLET) {
      return "Connect Methods";
    } else {
      if (account) {
        return "Enter Your Passcode";
      } else {
        return "Create Your Passcode";
      }
    }
  };

  return (
    <Modal open={isOpen} onClose={onToggleModal}>
      <ModalContainer>
        <Box className="modal-header flex-center">
          <Typography className="modal-header__title">
            {renderModalTitle()}
          </Typography>
          <Box className="modal-header__action">
            <CloseIcon onClick={onToggleModal} />
          </Box>
        </Box>
        <Box className="modal-information flex-center">
          {step === LOGIN_STEPS.CREATE_WALLET ? (
            <>
              <Box
                className="modal__information-method"
                onClick={connectWalletConnect}
              >
                <img
                  src={WalletConnectIcon}
                  alt="icon"
                  className="modal__information-method-icon"
                />
                <Typography className="modal__information-method-name">
                  Connect via WalletConnect
                </Typography>
              </Box>
              <Box className="modal__information-method" onClick={nextStep}>
                <img
                  src={JustFriendIcon}
                  alt="icon"
                  className="modal__information-method-icon"
                />
                <Typography className="modal__information-method-name">
                  Connect as a Friend
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => (
                  <input {...props} className="modal__information-otp-input" />
                )}
                renderSeparator={
                  <div className="modal__information-otp-seperator"></div>
                }
                shouldAutoFocus={true}
                onPaste={handlePaste}
                inputType="number"
              />
              <CustomButton
                title={loading ? <CircularProgress size={"20px"} /> : "Confirm"}
                sx={{ width: "100%" }}
                onClick={connectSelfDeployWallet}
                disabled={
                  loading ||
                  (otp.length < 6 && step === LOGIN_STEPS.CREATE_PASSWORD)
                }
              />
            </>
          )}
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default ConnectModal;
