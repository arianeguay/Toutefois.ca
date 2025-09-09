import api from '@/api';
import Logo from './Logo';
import Menu from './Menu';
import SpecialProjectMenuItem from './SpecialProject';
import { HeaderContainer } from './styles';

const Header = async () => {
  const menuItems = await api.fetchMenuItems();
  const specialProject = await api.fetchSpecialProjects();

  return (
    <HeaderContainer>
      <Logo />
      <Menu menuItems={menuItems} />
      {specialProject && <SpecialProjectMenuItem {...specialProject} />}
    </HeaderContainer>
  );
};

export default Header;
