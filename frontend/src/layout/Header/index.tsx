import Logo from './Logo';
import { HeaderContainer } from './styles';
import api from '../../api';
import { useState } from 'react';
import { useEffect } from 'react';
import type { WordpressMenuItem } from '../../types';
import { Link } from 'react-router-dom';

const Header = () => {

  const [menu, setMenu] = useState<WordpressMenuItem[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await api.fetchMenu();
        console.log(data);
        setMenu(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMenu();
  }, []);

  const getPathFromUrl = (url: string) => {
    try {
      return new URL(url).pathname;
    } catch (e) {
      return url; // Fallback for relative paths or invalid URLs
    }
  }

  return (
    <HeaderContainer>
      <Logo />
      <nav>
        <ul>
          {menu.map((item) => (
            <li key={item.id}>
              <Link to={getPathFromUrl(item.link)}>{item.title.rendered}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </HeaderContainer>
  );
};

export default Header;
