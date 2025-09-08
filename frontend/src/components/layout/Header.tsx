'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import type { WordpressMenuItem } from '../../types';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ theme }) => theme.appearance.headerHeight};
  background-color: ${({ theme }) => theme.colors.headerBackground};
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.lg}px;
`;

const Logo = styled(Link)`
  color: ${({ theme }) => theme.colors.lightText};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.h3}px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

const NavItem = styled(Link)<{ $isActive: boolean }>`
  color: ${({ theme }) => theme.colors.lightText};
  text-decoration: none;
  font-weight: ${({ $isActive, theme }) => 
    $isActive ? theme.fontWeights.bold : theme.fontWeights.normal};
  border-bottom: 2px solid ${({ $isActive, theme }) => 
    $isActive ? theme.colors.buttonPrimaryBackground : 'transparent'};
  padding: ${({ theme }) => theme.spacing.xs}px;
  transition: all 0.3s ease;
  
  &:hover {
    border-bottom-color: ${({ theme }) => theme.colors.buttonPrimaryBackground};
  }
`;

interface HeaderProps {
  menuItems: WordpressMenuItem[];
}

const Header = ({ menuItems }: HeaderProps) => {
  const pathname = usePathname();
  
  return (
    <HeaderContainer>
      <Logo href="/">Toutefois</Logo>
      <Nav>
        {menuItems.map((item) => {
          const path = item.slug === 'home' ? '/' : `/${item.slug}`;
          const isActive = pathname === path;
          
          return (
            <NavItem 
              key={item.id} 
              href={path}
              $isActive={isActive}
            >
              {item.title.rendered}
            </NavItem>
          );
        })}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
