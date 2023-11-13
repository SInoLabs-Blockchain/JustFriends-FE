import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/data/redux/Hooks";
import { ProfileRepository } from "src/data/repositories/ProfileRepository";
import { setProfile } from "src/data/redux/auth/AuthReducer";

import { ROUTE } from "src/common/constants/route";

const TABS = [
  { id: 0, name: "My posts" },
  { id: 1, name: "Purchased post" },
  { id: 2, name: "Revenue" },
];

type TabState = {
  id: number;
  name: string;
};

const useProfile = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { accessToken } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState("Trump");
  const [avatarUrl, setAvatarUrl] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/1/1b/Trump_SQ.png"
  );
  const [coverUrl, setCoverUrl] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/1/1b/Trump_SQ.png"
  );

  const [tab, setTab] = useState<TabState>({
    id: TABS[0].id,
    name: TABS[0].name,
  });

  const onChangeTab = (data: TabState) => {
    setTab(data);
  };

  const navigateToEditProfile = () => {
    navigate(ROUTE.EDIT_PROFILE);
  };

  const onChangeUsername = (event: any) => {
    setUsername(event.target.value);
  };

  const onEditProfile = async () => {
    const profileRepository = ProfileRepository.create();

    try {
      const res = await profileRepository.editProfile(
        accessToken,
        avatarUrl,
        username,
        coverUrl
      );

      dispatch(setProfile(res));
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    tab,
    TABS,
    username,
    onChangeTab,
    navigateToEditProfile,
    onEditProfile,
    onChangeUsername,
  };
};

export default useProfile;
