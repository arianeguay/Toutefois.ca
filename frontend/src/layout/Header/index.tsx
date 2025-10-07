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
    <ClientBlock style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <HeaderContainer>
        <Logo />
        <Menu menuItems={menuItems} donation_link={donation_link} />
        {specialProject && <SpecialProjectMenuItem {...specialProject} />}
      </HeaderContainer>
    </ClientBlock>
  );
};

export default Header;
