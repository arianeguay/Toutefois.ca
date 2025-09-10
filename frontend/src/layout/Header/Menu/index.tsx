'use client';
import { WordpressMenuItem } from '@/types';
import MenuItem from './menu-item';
import { MenuContainer } from './styles';

interface MenuProps {
  menuItems: WordpressMenuItem[];
}
const Menu: React.FC<MenuProps> = ({ menuItems }) => {
  return (
    <MenuContainer>
      {menuItems.map((item) => (
        <MenuItem key={item.href} {...item} />
      ))}
    </MenuContainer>
  );
};

export default Menu;
