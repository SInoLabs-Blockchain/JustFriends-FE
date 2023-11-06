import { Box, TextField, Typography } from "@mui/material";
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

interface IProps {
    open: boolean;
    onToggleModal: () => void;
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

    const renderPostOptions = () => (
        <Box className="relative">
            <StyledSelect className="flex-center" onClick={onToggleSelect}>
                <Typography className="post-option__name">
                    {option.title}
                </Typography>
                <ArrowDownIcon />
            </StyledSelect>
            {openOptionSelect && (
                <StyledSelectMenu>
                    {POST_OPTIONS.map((option) => (
                        <StyledSelectItem onClick={() => onSelectMenu(option)}>
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
            aria-describedby="modal-modal-description">
            <ModalContainer>
                <Box className="modal-header flex-center">
                    <Typography className="modal-header__title">
                        Create post
                    </Typography>
                    <Box className="modal-header__action">
                        <CloseIcon onClick={onToggleModal} />
                    </Box>
                </Box>
                <Box className="modal-information flex-center">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Trump_SQ.png"
                        alt="avatar"
                        className="modal-information__avatar"
                    />
                    <Box>
                        <Typography className="modal-information__name">
                            Phong
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
                    <Typography className="action__title">
                        Add to you post
                    </Typography>
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
                        backgroundColor="linear-gradient(95.5deg, #A07AF7 0%, #55A0F0 100.09%)"
                        variant={"contained"}
                        onClick={handleSharePost}
                    />
                </StyledButtonShare>
            </ModalContainer>
        </Modal>
    );
};

export default ModalCreatePost;
