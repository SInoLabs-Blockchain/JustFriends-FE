import { Box, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import useHome from "../../useHome";
import {
    ModalContainer,
    StyledSelect,
    StyledSelectMenu,
    StyledSelectItem,
    StyledTextArea,
} from "./styles";
import { ArrowDownIcon, CloseIcon } from "src/presentation/theme/assets/icons";
import { POST_OPTIONS } from "src/common/constants";

interface IProps {
    open: boolean;
}

const ModalCreatePost = (props: IProps) => {
    const { open } = props;
    const {
        option,
        openOptionSelect,
        textareaValue,
        textareaHeight,
        handleToggleModal,
        onToggleSelect,
        onSelectMenu,
        handleTextareaChange,
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

    return (
        <Modal
            open={open}
            onClose={handleToggleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <ModalContainer>
                <Box className="modal-header flex-center">
                    <Typography className="modal-header__title">
                        Create post
                    </Typography>
                    <Box className="modal-header__action">
                        <CloseIcon />
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
            </ModalContainer>
        </Modal>
    );
};

export default ModalCreatePost;
