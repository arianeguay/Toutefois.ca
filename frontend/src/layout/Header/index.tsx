import api from '@/api';
import { WordpressPage } from '@/types';
import Logo from './Logo';
import Menu from './Menu';
import SpecialProjectMenuItem from './SpecialProject';
import { HeaderContainer } from './styles';

interface HeaderProps {
  currentPage?: WordpressPage;
  donation_link?: string;
}
const Header = async ({ currentPage, donation_link }: HeaderProps) => {
  const menuItems = await api.fetchMenuItems();
  const specialProject = await api.fetchSpecialProjects();

  const mainColor = currentPage?.meta?.main_color;

  return (
    <HeaderContainer $mainColor={mainColor}>
      <Logo />
      <Menu menuItems={menuItems} />
      {specialProject && <SpecialProjectMenuItem {...specialProject} />}
      <div>{donation_link}</div>
    </HeaderContainer>
  );
};

export default Header;
