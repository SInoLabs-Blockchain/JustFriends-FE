import ProfileCard from "src/presentation/features/home/ProfileCard";
import Filter from "src/presentation/features/home/components/Filter";
import { MenuContainer } from "src/presentation/features/home/styles";
import useHome from "src/presentation/features/home/useHome";

interface IProps {
  isFreePosts: boolean;
  setIsFreePosts: (value: boolean) => void;
}

const Menu = (props: IProps) => {
  const { isFreePosts, setIsFreePosts } = props;

  const { profile } = useHome();

  return (
    <MenuContainer>
      {profile && <ProfileCard />}
      <Filter checked={isFreePosts} setChecked={setIsFreePosts} />
    </MenuContainer>
  );
};

export default Menu;
