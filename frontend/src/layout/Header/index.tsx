'use client';

import type { WordpressMenuItem } from '../../types';
import Logo from './Logo';
import Menu from './Menu';
import SpecialProjectMenuItem from './SpecialProject';
import { HeaderContainer } from './styles';

interface HeaderProps {
  menuItems: WordpressMenuItem[];
  specialProject: WordpressMenuItem | null;
}
const Header = ({ menuItems, specialProject }: HeaderProps) => {
  return (
    <HeaderContainer>
      <Logo />
      <Menu menuItems={menuItems} />
      {specialProject && <SpecialProjectMenuItem {...specialProject} />}
    </HeaderContainer>
  );
};

export default Header;
