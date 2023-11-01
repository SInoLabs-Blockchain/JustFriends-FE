import { Box, IconButton, Typography } from '@mui/material';
import CustomButton from 'src/presentation/components/button';
import {
  AttachIcon,
  PhotoIcon,
  TagIcon,
} from 'src/presentation/theme/assets/icons';
import { PostInputContainer } from './styles';

const PostInput = () => {
  return (
    <PostInputContainer>
      <Box className='post__input-main'>
        <Box>
          <img
            src={
              'https://upload.wikimedia.org/wikipedia/commons/1/1b/Trump_SQ.png'
            }
            alt='avatar'
          />
          <Typography>What's on your mind?</Typography>
        </Box>
        <CustomButton
          title='Share Post'
          backgroundColor='linear-gradient(95.5deg, #A07AF7 0%, #55A0F0 100.09%)'
        />
      </Box>
      <Box className='post__input-extra'>
        <IconButton>
          <PhotoIcon />
          <Typography>Image</Typography>
        </IconButton>
        <IconButton>
          <AttachIcon />
          <Typography>Attachment</Typography>
        </IconButton>
        <IconButton>
          <TagIcon />
          <Typography>Hashtag</Typography>
        </IconButton>
      </Box>
    </PostInputContainer>
  );
};

export default PostInput;
