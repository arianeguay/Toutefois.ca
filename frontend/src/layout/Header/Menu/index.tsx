'use client';
import Button from '@/components/common/Button';
import { WordpressMenuItem } from '@/types';
import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import MenuDrawer from '../Drawer';
import MenuItem from './menu-item';
import { MenuContainer } from './styles';
interface MenuProps {
  menuItems: WordpressMenuItem[];
  donation_link?: string;
}
const breakpointToNumber = (breakpoint: string) =>
  parseInt(breakpoint.replace('px', ''));
const Menu: React.FC<MenuProps> = ({ menuItems, donation_link }) => {
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpointToNumber(theme.breakpoints.xl));
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
          <Button style={{ marginLeft: theme.spacing.lg }} href={donation_link}>
            Faire un don
          </Button>
        </MenuContainer>
      )}
    </>
  );
};

export default Menu;
