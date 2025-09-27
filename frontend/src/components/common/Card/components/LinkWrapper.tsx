import Link from 'next/link';

interface LinkWrapperProps {
  children: React.ReactNode;
  linkPath: string | undefined;
  linkType: 'internal' | 'external';
}
const LinkWrapper: React.FC<LinkWrapperProps> = ({
  children,
  linkPath,
  linkType,
}) => {
  if (!linkPath) return <>{children}</>;
  return linkType === 'internal' ? (
    <Link href={linkPath} style={{ textDecoration: 'none' }}>
      {children}
    </Link>
  ) : (
    <a
      href={linkPath}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none' }}
    >
      {children}
    </a>
  );
};

export default LinkWrapper;
