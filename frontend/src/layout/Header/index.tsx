import api from '@/api';
import { WordpressPage } from '@/types';
import Logo from './Logo';
import Menu from './Menu';
import SpecialProjectMenuItem from './SpecialProject';
import { HeaderContainer } from './styles';

interface HeaderProps {
  currentPage?: WordpressPage;
}
const Header = async ({ currentPage }: HeaderProps) => {
  const menuItems = await api.fetchMenuItems();
  const specialProject = await api.fetchSpecialProjects();

  const mainColor = currentPage?.meta?.main_color;

  return (
    <HeaderContainer $mainColor={mainColor}>
      <Logo />
      <Menu menuItems={menuItems} currentPage={currentPage} />
      {specialProject && <SpecialProjectMenuItem {...specialProject} />}
    </HeaderContainer>
  );
};

export default Header;
