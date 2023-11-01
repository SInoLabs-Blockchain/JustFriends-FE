import { Box } from '@mui/material';
import ProfileCard from 'src/presentation/features/home/ProfileCard';
import Filter from 'src/presentation/features/home/components/Filter';
import useMenu from './useMenu';

const Menu = () => {
  const { checked, setChecked } = useMenu();

  return (
    <Box display={'flex'} flexDirection={'column'} gap={3.75}>
      <ProfileCard />
      <Filter checked={checked} setChecked={setChecked} />
    </Box>
  );
};

export default Menu;
