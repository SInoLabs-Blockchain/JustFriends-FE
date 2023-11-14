import { useAppSelector } from "src/data/redux/Hooks";
import ProfileCard from "src/presentation/features/home/ProfileCard";
import Filter from "src/presentation/features/home/components/Filter";
import { MenuContainer } from "src/presentation/features/home/styles";
import useHome from "src/presentation/features/home/useHome";

const Menu = () => {
  const { isFreePosts, setIsFreePosts } = useHome();
  const { accessToken } = useAppSelector((state) => state.auth);

  return (
    <MenuContainer>
      {accessToken ? <ProfileCard /> : null}
      <Filter checked={isFreePosts} setChecked={setIsFreePosts} />
    </MenuContainer>
  );
};

export default Menu;
