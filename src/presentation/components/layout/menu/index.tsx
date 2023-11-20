import { useAppSelector } from "src/data/redux/Hooks";
import ProfileCard from "src/presentation/features/home/ProfileCard";
import Filter from "src/presentation/features/home/components/Filter";
import { MenuContainer } from "src/presentation/features/home/styles";

interface IProps {
  isFreePosts: boolean;
  handleSwitchZone: ((value: boolean) => void) | null;
  navigateToProfile?: any;
  copyAddress?: any;
}

const Menu = (props: IProps) => {
  const { isFreePosts, handleSwitchZone, navigateToProfile, copyAddress } =
    props;

  const { accessToken } = useAppSelector((state) => state.auth);

  return (
    <MenuContainer>
      {accessToken && (
        <ProfileCard
          navigateToProfile={navigateToProfile}
          copyAddress={copyAddress}
        />
      )}
      {handleSwitchZone ? (
        <Filter checked={isFreePosts} setChecked={handleSwitchZone} />
      ) : null}
    </MenuContainer>
  );
};

export default Menu;
