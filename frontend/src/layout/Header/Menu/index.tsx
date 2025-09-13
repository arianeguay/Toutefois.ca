'use client';
import { WordpressMenuItem } from '@/types';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'styled-components';
import MenuDrawer from '../Drawer';
import MenuItem from './menu-item';
import { MenuContainer } from './styles';
interface MenuProps {
  menuItems: WordpressMenuItem[];
}
const Menu: React.FC<MenuProps> = ({ menuItems }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery({ maxWidth: theme.breakpoints.md });
  return (
    <>
      {isMobile ? (
        <MenuDrawer menuItems={menuItems} />
      ) : (
        <MenuContainer>
          {menuItems.map((item) => (
            <MenuItem key={item.href} {...item} />
          ))}
        </MenuContainer>
      )}
    </>
  );
};

export default Menu;
