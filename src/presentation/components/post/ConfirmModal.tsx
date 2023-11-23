import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import { ModalContainer } from "./styles";
import { CloseIcon } from "src/presentation/theme/assets/icons";
import CustomButton from "../button";
import { MODAL_TYPES } from "src/common/constants";
import { formatEther } from "viem";

interface IProps {
  isOpen: boolean;
  onClose: (contentHash?: string) => void;
  price: any;
  handlePurchasePostAccess: any;
  handleSellPostAccess: any;
  isPurchasing: boolean;
  type: number;
}

const ConfirmModal = (props: IProps) => {
  return (
    <Modal open={props.isOpen} onClose={() => props.onClose("")}>
      <ModalContainer>
        <Box className="modal-header flex-center">
          <Typography className="modal-header__title">
            {"Confirmation"}
          </Typography>
          <Box className="modal-header__action">
            <CloseIcon onClick={() => props.onClose("")} />
          </Box>
        </Box>
        <Box className="modal-information flex-center">
          <Typography>
            Are you sure you want to{" "}
            {props.type === MODAL_TYPES.PURCHASE ? "purchase" : "sell"} this
            post for {formatEther(props.price || "")} KLAY?
          </Typography>
        </Box>
        <Box className="modal-action">
          <CustomButton
            title={props.isPurchasing ? <CircularProgress size={12} /> : "Yes"}
            disabled={props.isPurchasing}
            onClick={() =>
              props.type === MODAL_TYPES.PURCHASE
                ? props.handlePurchasePostAccess(props.price)
                : props.handleSellPostAccess()
            }
          />
          <CustomButton title="No" onClick={() => props.onClose("")} />
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default ConfirmModal;
