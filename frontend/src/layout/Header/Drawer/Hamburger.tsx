import { HamburgerContainer, HamburgerLine } from './styles';

interface HamburgerProps {
  onClick?: () => void;
  isOpen?: boolean;
}
const Hamburger = ({ onClick, isOpen }: HamburgerProps) => {
  return (
    <HamburgerContainer onClick={onClick} $isOpen={isOpen}>
      <HamburgerLine />
      <HamburgerLine />
      <HamburgerLine />
    </HamburgerContainer>
  );
};

export default Hamburger;
