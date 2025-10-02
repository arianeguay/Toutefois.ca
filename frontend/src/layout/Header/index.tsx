import api from '@/api';
import ClientBlock from '@/components/blocks/ClientBlock';
import Logo from './Logo';
import Menu from './Menu';
import SpecialProjectMenuItem from './SpecialProject';
import { HeaderContainer } from './styles';

interface HeaderProps {
  donation_link?: string;
}

const Header = async ({ donation_link }: HeaderProps) => {
  const menuItems = await api.fetchMenuItems();
  const specialProject = await api.fetchSpecialProjects();

  return (
    <ClientBlock>
      <HeaderContainer>
        <Logo />
        <Menu menuItems={menuItems} />
        {specialProject && <SpecialProjectMenuItem {...specialProject} />}
      </HeaderContainer>
    </ClientBlock>
  );
};

export default Header;
