import Link from 'next/link';
import type { WordpressMenuItem } from '../../types';
import Logo from './Logo';
import { HeaderContainer } from './styles';

interface HeaderProps {
  menuItems: WordpressMenuItem[];
}
const Header = ({ menuItems }: HeaderProps) => {
  const getPathFromUrl = (url: string) => {
    try {
      return new URL(url).pathname;
    } catch (e) {
      return url; // Fallback for relative paths or invalid URLs
    }
  };

  return (
    <HeaderContainer>
      <Logo />
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <Link href={getPathFromUrl(item.link)}>
                {item.title.rendered}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </HeaderContainer>
  );
};

export default Header;
