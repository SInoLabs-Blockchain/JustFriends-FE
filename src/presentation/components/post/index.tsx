import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';
import {
  DownvoteIcon,
  MoreIcon,
  ShareIcon,
  UpvoteIcon,
} from 'src/presentation/theme/assets/icons';
import CustomButton from '../button';
import { PostContainer } from './styles';

interface PropTypes {
  data: any;
  width?: string;
}

const Post = ({ data, width }: PropTypes) => {
  return (
    <Card sx={{ width, height: 'fit-content' }}>
      <PostContainer>
        <CardHeader
          avatar={
            <Avatar>
              <img src={data.creator.avatar} alt='avatar' />
            </Avatar>
          }
          title={data.creator.name}
          subheader='September 14, 2016'
          action={
            <IconButton>
              <MoreIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Typography>{data.content}</Typography>
        </CardContent>
        <Box className='separator'>
          <hr />
        </Box>
        <CardActions>
          <Box>
            <IconButton>
              <UpvoteIcon />
              <Typography className='post__interactions-votes'>
                {data.upvote} upvotes
              </Typography>
            </IconButton>
            <IconButton>
              <DownvoteIcon />
              <Typography className='post__interactions-votes'>
                {data.downvote} downvotes
              </Typography>
            </IconButton>
          </Box>
          <Box>
            <Box>
              <Typography className='post__interactions-holders'>
                {data.holder} holders
              </Typography>
              <CustomButton
                title='Buy Share'
                variant={'contained'}
                startIcon={<ShareIcon />}
              />
            </Box>
          </Box>
        </CardActions>
      </PostContainer>
    </Card>
  );
};

export default Post;
