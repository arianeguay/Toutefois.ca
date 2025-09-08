import { WordpressMenuItem } from '@/types';
import MenuItem from './menu-item';
import { MenuContainer } from './styles';

const Menu = ({ menuItems }: { menuItems: WordpressMenuItem[] }) => {
  return (
    <MenuContainer>
      {menuItems.map((item) => (
        <MenuItem key={item.href} {...item} />
      ))}
    </MenuContainer>
  );
};

export default Menu;
