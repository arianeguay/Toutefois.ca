'use client';

import Typography from '@/components/common/Typography';
import { WordpressMenuItem } from '@/types';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import MenuItem from '../Menu/menu-item';
import Hamburger from './Hamburger';
import { DrawerContainer, DrawerMenuContent } from './styles';

interface MenuDrawerProps {
  menuItems: WordpressMenuItem[];
}
const MenuDrawer: React.FC<MenuDrawerProps> = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const toggleDrawer = () => setIsOpen(!isOpen);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  return (
    <>
      <Hamburger onClick={toggleDrawer} isOpen={isOpen} />
      <DrawerContainer $isOpen={isOpen}>
        <DrawerMenuContent>
          <Typography variant="h3">Menu</Typography>
          {menuItems.map((item) => (
            <MenuItem key={item.href} {...item} />
          ))}
        </DrawerMenuContent>
      </DrawerContainer>
    </>
  );
};

export default MenuDrawer;
