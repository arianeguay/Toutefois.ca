import api from '@/api';
import Logo from './Logo';
import Menu from './Menu';
import SpecialProjectMenuItem from './SpecialProject';
import { HeaderContainer } from './styles';
import ClientBlock from '@/components/blocks/ClientBlock';

interface HeaderProps {
  mainColor?: string;
  donation_link?: string;
}
const Header = async ({ mainColor, donation_link }: HeaderProps) => {
  const menuItems = await api.fetchMenuItems();
  const specialProject = await api.fetchSpecialProjects();

  return (
    <ClientBlock>
      <HeaderContainer $mainColor={mainColor}>
        <Logo />
        <Menu menuItems={menuItems} />
        {specialProject && <SpecialProjectMenuItem {...specialProject} />}
      </HeaderContainer>
    </ClientBlock>
  );
};

export default Header;
