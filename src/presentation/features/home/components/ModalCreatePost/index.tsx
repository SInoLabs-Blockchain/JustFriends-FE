import { Avatar, Box, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import useHome from "../../useHome";
import {
  ModalContainer,
  StyledSelect,
  StyledSelectMenu,
  StyledSelectItem,
  StyledTextArea,
  StyledBottomActions,
  StyledButtonShare,
  StyledBaseFeeContainer,
} from "./styles";
import {
  ArrowDownIcon,
  CloseIcon,
  PaperClipIcon,
  PictureIcon,
  TagUserIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  TextsStrikethroughIcon,
} from "src/presentation/theme/assets/icons";
import { POST_OPTIONS } from "src/common/constants";
import CustomButton from "src/presentation/components/button";
import COLOR from "src/presentation/theme/Color";
import { useAppSelector } from "src/data/redux/Hooks";
import { stringAvatar } from "src/common/utils";

interface IProps {
  open: boolean;
  onToggleModal: () => void;
  onRemoveText: () => void;
}

const ModalCreatePost = (props: IProps) => {
  const { open, onToggleModal } = props;
  const {
    option,
    openOptionSelect,
    textareaValue,
    textareaHeight,
    baseFee,
    onToggleSelect,
    onSelectMenu,
    handleTextareaChange,
    setBaseFee,
    handleSharePost,
  } = useHome();
  const { profile } = useAppSelector((state) => state.auth);

  const renderPostOptions = () => (
    <Box className="relative">
      <StyledSelect
        className="post-option__dropdown flex-center"
        onClick={onToggleSelect}
      >
        <Typography className="post-option__name">{option.title}</Typography>
        <ArrowDownIcon />
      </StyledSelect>
      {openOptionSelect && (
        <StyledSelectMenu>
          {POST_OPTIONS.map((option) => (
            <StyledSelectItem
              className="post-option__dropdown"
              onClick={() => onSelectMenu(option)}
            >
              <Typography className="post-title__title">
                {option.title}
              </Typography>
            </StyledSelectItem>
          ))}
        </StyledSelectMenu>
      )}
    </Box>
  );

  const renderBaseFeeInput = () => (
    <StyledBaseFeeContainer className="flex-center">
      <Typography className="action__title">Base fee</Typography>
      <Box className="action__input-container flex-center">
        <TextField
          value={baseFee}
          onChange={(e) => setBaseFee(e.target.value)}
          placeholder="0"
        />
        <Typography className="fee__symbol">KLAY</Typography>
      </Box>
    </StyledBaseFeeContainer>
  );

  return (
    <Modal
      open={open}
      onClose={onToggleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ zIndex: 10 }}
    >
      <ModalContainer>
        <Box className="modal-header flex-center">
          <Typography className="modal-header__title">Create post</Typography>
          <Box className="modal-header__action">
            <CloseIcon onClick={onToggleModal} />
          </Box>
        </Box>
        <Box className="modal-information flex-center">
          {profile?.avatarUrl ? (
            <img
              src={profile?.avatarUrl}
              alt="avatar"
              className="modal-information__avatar"
            />
          ) : (
            <Avatar
              {...stringAvatar(profile?.username)}
              className="modal-information__avatar"
            />
          )}
          <Box className="modal-information__create">
            <Typography className="modal-information__name">
              {profile?.username}
            </Typography>
            {renderPostOptions()}
          </Box>
        </Box>
        <StyledTextArea
          value={textareaValue}
          placeholder="What is on your mind?"
          style={{ height: `${textareaHeight}px` }}
          onChange={handleTextareaChange}
        />
        <StyledBottomActions className="flex-center">
          <Typography className="action__title">Add to you post</Typography>
          <Box className="bottom__attachs flex-center">
            <Box className="bottom__attach-item">
              <TextBoldIcon />
            </Box>
            <Box className="bottom__attach-item">
              <TextItalicIcon />
            </Box>
            <Box className="bottom__attach-item">
              <TextUnderlineIcon />
            </Box>
            <Box className="bottom__attach-item">
              <TextsStrikethroughIcon />
            </Box>
            <Box className="bottom__attach-item">
              <PictureIcon />
            </Box>
            <Box className="bottom__attach-item">
              <PaperClipIcon />
            </Box>
            <Box className="bottom__attach-item">
              <TagUserIcon />
            </Box>
          </Box>
        </StyledBottomActions>
        {option.id === 2 && renderBaseFeeInput()}
        <StyledButtonShare>
          <CustomButton
            title="Share"
            backgroundColor={COLOR.linear}
            variant={"contained"}
            onClick={handleSharePost}
          />
        </StyledButtonShare>
      </ModalContainer>
    </Modal>
  );
};

export default ModalCreatePost;
