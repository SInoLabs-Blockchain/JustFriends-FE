import { useState } from "react";

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

export default useProfile;
