import { Box, IconButton, Typography } from "@mui/material";
import {
    AttachIcon,
    PhotoIcon,
    TagIcon,
} from "src/presentation/theme/assets/icons";
import { PostInputContainer } from "./styles";

interface IProps {
    onToggleModal: () => void;
}

const PostInput = (props: IProps) => {
    const { onToggleModal } = props;

    return (
        <PostInputContainer>
            <Box className="post__input-main">
                <img
                    src={
                        "https://upload.wikimedia.org/wikipedia/commons/1/1b/Trump_SQ.png"
                    }
                    alt="avatar"
                />
                <Typography onClick={onToggleModal}>
                    What's on your mind?
                </Typography>
            </Box>
            <Box className="post__input-extra">
                <IconButton>
                    <PhotoIcon />
                    <Typography className="post__input-extra-text">
                        Image
                    </Typography>
                </IconButton>
                <IconButton>
                    <AttachIcon />
                    <Typography className="post__input-extra-text">
                        Attachment
                    </Typography>
                </IconButton>
                <IconButton>
                    <TagIcon />
                    <Typography className="post__input-extra-text">
                        Hashtag
                    </Typography>
                </IconButton>
            </Box>
        </PostInputContainer>
    );
};

export default PostInput;
