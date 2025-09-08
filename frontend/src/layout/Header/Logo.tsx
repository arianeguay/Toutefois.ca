import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" style={{ flexShrink: 0 }}>
      <img
        src="/Logo.png"
        alt="Logo du Théâtre de Toutefois"
        width={100}
        style={{
          width: '100px',
          height: '100px',
        }}
        height={100}
      />
    </Link>
  );
};

export default Logo;
