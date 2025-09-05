import Logo from './Logo';
import { HeaderContainer } from './styles';
import api from '../../api';
import { useState } from 'react';
import { useEffect } from 'react';
import type { WordpressMenuItem } from '../../types';

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

  return (
    <HeaderContainer>
      <Logo />
      <nav>
        <ul>
          {menu.map((item) => (
            <li key={item.id}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </HeaderContainer>
  );
};

export default Header;
