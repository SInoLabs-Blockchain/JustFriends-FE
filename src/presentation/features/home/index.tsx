import { Box } from '@mui/material';
import Post from 'src/presentation/components/post';
import PostInput from './PostInput';
import ProfileCard from './ProfileCard';
import TopAuthor from './TopAuthor';

const Home = () => {
  const data = {
    creator: {
      name: 'Donald Trump',
      avatar:
        'https://upload.wikimedia.org/wikipedia/commons/1/1b/Trump_SQ.png',
    },
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    upvote: 125,
    downvote: 18,
    holder: 312,
  };
  return (
    <Box display={'flex'} padding={'30px'} justifyContent={'space-between'}>
      <ProfileCard />
      <Box display={'flex'} flexDirection={'column'} width={'50%'} gap={'24px'}>
        <PostInput />
        <Post data={data} />
        <Post data={data} />
        <Post data={data} />
        <Post data={data} />
      </Box>
      <TopAuthor />
    </Box>
  );
};

export default Home;
