import { Box, Card, Typography } from '@mui/material';
import PostIcon from 'src/presentation/theme/assets/icons/menu/notepad-bookmark.svg';
import UserIcon from 'src/presentation/theme/assets/icons/menu/user.svg';

const SearchCategories = () => {
  return (
    <Card className='search__result-categories'>
      <Typography>Search result</Typography>
      <Box className='search__result-category search__result__category-selected'>
        <img src={PostIcon} alt='post' />
        <Typography>Posts</Typography>
      </Box>
      <Box className='search__result-category'>
        <img src={UserIcon} alt='user' />
        <Typography>People</Typography>
      </Box>
    </Card>
  );
};

export default SearchCategories;
