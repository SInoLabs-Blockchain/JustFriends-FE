import { useState } from 'react';
import { ChartIcon, NotepadIcon } from 'src/presentation/theme/assets/icons';
import {
  Container,
  MenuSection,
  MenuTitle,
  MenuWrapper,
  StyledSwitch,
} from './styles';

interface IProps {
  checked: boolean;
  setChecked: (value: any) => void;
}

const initialMenuItems = [
  {
    title: 'New posts',
    icon: <NotepadIcon />,
    isSelected: true,
  },
  {
    title: 'Trending posts',
    icon: <ChartIcon />,
    isSelected: false,
  },
];

const Filter = (props: IProps) => {
  const { checked, setChecked } = props;

  const [menuItems, setMenuItems] = useState(initialMenuItems);

  return (
    <Container>
      <StyledSwitch
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />

      <MenuSection>
        {menuItems.map((item: any) => (
          <MenuWrapper onClick={() => console.log('dasdasdasdasdasd')}>
            {item.icon}
            <MenuTitle>{item.title}</MenuTitle>
          </MenuWrapper>
        ))}
      </MenuSection>
    </Container>
  );
};

export default Filter;
