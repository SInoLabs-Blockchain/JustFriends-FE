import { useAppSelector } from "src/data/redux/Hooks";
import ProfileCard from "src/presentation/features/home/ProfileCard";
import Filter from "src/presentation/features/home/components/Filter";
import { MenuContainer } from "src/presentation/features/home/styles";

interface IProps {
  isFreePosts: boolean;
  setIsFreePosts: (value: boolean) => void;
  navigateToProfile?: any;
  copyAddress?: any;
}

const Menu = (props: IProps) => {
  const { isFreePosts, setIsFreePosts, navigateToProfile, copyAddress } = props;

  const { profile } = useAppSelector((state) => state.auth);

  return (
    <MenuContainer>
      {profile && (
        <ProfileCard
          navigateToProfile={navigateToProfile}
          copyAddress={copyAddress}
        />
      )}
      <Filter checked={isFreePosts} setChecked={setIsFreePosts} />
    </MenuContainer>
  );
};

export default Menu;
