'use client';
import { WordpressMenuItem } from '@/types';
import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import MenuDrawer from '../Drawer';
import MenuItem from './menu-item';
import { MenuContainer } from './styles';
interface MenuProps {
  menuItems: WordpressMenuItem[];
}
const breakpointToNumber = (breakpoint: string) =>
  parseInt(breakpoint.replace('px', ''));
const Menu: React.FC<MenuProps> = ({ menuItems }) => {
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpointToNumber(theme.breakpoints.md));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
