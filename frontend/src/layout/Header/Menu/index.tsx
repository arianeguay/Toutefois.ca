'use client';
import { WordpressMenuItem, WordpressPage } from '@/types';
import MenuItem from './menu-item';
import { MenuContainer } from './styles';

const Menu = ({
  menuItems,
  currentPage,
}: {
  menuItems: WordpressMenuItem[];
  currentPage?: WordpressPage;
}) => {
  console.log(currentPage);
  return (
    <MenuContainer>
      {menuItems.map((item) => (
        <MenuItem key={item.href} {...item} />
      ))}
    </MenuContainer>
  );
};

export default Menu;
