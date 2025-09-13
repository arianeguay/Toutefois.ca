import Link from 'next/link';
import { LogoImage } from './styles';

const Logo = () => {
  return (
    <Link href="/" style={{ flexShrink: 0 }}>
      <LogoImage
        src="/Logo.png"
        alt="Logo du Théâtre de Toutefois"
        width={100}
        height={100}
      />
    </Link>
  );
};

export default Logo;
