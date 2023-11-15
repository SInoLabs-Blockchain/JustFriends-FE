import { useState } from "react";

const TABS = [
  { id: 0, name: "Purchased posts" },
  { id: 1, name: "Unpurchased posts" },
  { id: 2, name: "Free posts" },
];

type TabState = {
  id: number;
  name: string;
};

const useCreatorProfile = () => {
  const [tab, setTab] = useState<TabState>({
    id: TABS[0].id,
    name: TABS[0].name,
  });

  const onChangeTab = (data: TabState) => {
    setTab(data);
  };

  return {
    tab,
    TABS,
    onChangeTab,
  };
};

export default useCreatorProfile;
