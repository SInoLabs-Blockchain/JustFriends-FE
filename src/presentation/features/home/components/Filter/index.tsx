import { useState } from "react";
import { ChartIcon, NotepadIcon } from "src/presentation/theme/assets/icons";
import {
    Container,
    MenuSection,
    MenuTitle,
    MenuWrapper,
    StyledSwitch,
} from "./styles";

interface IProps {
    checked: boolean;
    setChecked: (value: any) => void;
}

const initialMenuItems = [
    {
        title: "New posts",
        icon: <NotepadIcon />,
        isSelected: true,
    },
    {
        title: "Trending posts",
        icon: <ChartIcon />,
        isSelected: false,
    },
];

const Filter = (props: IProps) => {
    const { checked, setChecked } = props;

    const [menuItems, setMenuItems] = useState(initialMenuItems);
    const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);

    const _onSelectMenu = (index: number) => {
        const updatedMenuItems = [...menuItems];

        updatedMenuItems.forEach((item, i) => {
            item.isSelected = i === index;
        });

        setSelectedMenuIndex(index);
        setMenuItems(updatedMenuItems);
    };

    return (
        <Container>
            <StyledSwitch
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
            />

            <MenuSection>
                {menuItems.map((item: any, index: number) => (
                    <MenuWrapper
                        isSelected={selectedMenuIndex === index}
                        onClick={() => _onSelectMenu(index)}>
                        {item.icon}
                        <MenuTitle isSelected={selectedMenuIndex === index}>
                            {item.title}
                        </MenuTitle>
                    </MenuWrapper>
                ))}
            </MenuSection>
        </Container>
    );
};

export default Filter;
