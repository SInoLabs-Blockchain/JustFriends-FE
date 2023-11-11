import { Box, IconButton, Typography } from '@mui/material';
import { MoreIcon } from 'src/presentation/theme/assets/icons';
import { TopAuthorContainer, TopAuthorHeaderContainer, TopAuthorListContainer } from './styles';

const TopAuthor = () => {
  const authors = [
    {
      id: 1,
      avatar: '',
      name: 'Ronald Smith',
      upvotes: 1203,
    },
    {
      id: 2,
      avatar: '',
      name: 'Ronald Smith',
      upvotes: 1203,
    },
    {
      id: 2,
      avatar: '',
      name: 'Ronald Smith',
      upvotes: 1203,
    },
    {
      id: 4,
      avatar: '',
      name: 'Ronald Smith',
      upvotes: 1203,
    },
    {
      id: 5,
      avatar: '',
      name: 'Ronald Smith',
      upvotes: 1203,
    },
    {
      id: 6,
      avatar: '',
      name: 'Ronald Smith',
      upvotes: 1203,
    },
    {
      id: 7,
      avatar: '',
      name: 'Ronald Smith',
      upvotes: 1203,
    },
    {
      id: 8,
      avatar: '',
      name: 'Ronald Smith',
      upvotes: 1203,
    },
    {
      id: 9,
      avatar: '',
      name: 'Ronald Smith',
      upvotes: 1203,
    },
    {
      id: 10,
      avatar: '',
      name: 'Ronald Smith',
      upvotes: 1203,
    },
  ];
  return (
    <TopAuthorContainer>
      <TopAuthorHeaderContainer>
        <Typography className='author__list-label'>TOP AUTHOR</Typography>
        <Typography className='author__list-pagination'>10</Typography>
      </TopAuthorHeaderContainer>
      <TopAuthorListContainer>
        {authors.map((author) => (
          <Box className='author__list-item'>
            <Box className='author__container'>
              <img
                src={
                  'https://upload.wikimedia.org/wikipedia/commons/1/1b/Trump_SQ.png'
                }
                alt='avatar'
                className='author__container-avatar'
              />
              <Box className='author__container-info'>
                <Typography className='author__container-name'>
                  {author.name}
                </Typography>
                <Typography className='author__container-upvotes'>
                  {author.upvotes} upvotes
                </Typography>
              </Box>
            </Box>
            <IconButton>
              <MoreIcon />
            </IconButton>
          </Box>
        ))}
      </TopAuthorListContainer>
    </TopAuthorContainer>
  );
};

export default TopAuthor;
