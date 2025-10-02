'use client';

import { HamburgerContainer, HamburgerLine } from './styles';

interface HamburgerProps {
  onClick?: () => void;
  isOpen?: boolean;
}
const Hamburger = ({ onClick, isOpen }: HamburgerProps) => {
  return (
    <HamburgerContainer onClick={onClick} $isOpen={isOpen}>
      <HamburgerLine key="line1" />
      <HamburgerLine key="line2" />
      <HamburgerLine key="line3" />
    </HamburgerContainer>
  );
};

export default Hamburger;
