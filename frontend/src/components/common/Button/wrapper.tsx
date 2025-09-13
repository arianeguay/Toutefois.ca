'use client';

import Link from 'next/link';

interface ButtonLinkWrapperProps {
  href?: string;
  children: React.ReactNode;
}

const ButtonLinkWrapper: React.FC<ButtonLinkWrapperProps> = ({ href, children }) => {
  if (!href) return <>{children}</>;
  
  // Handle external links (starting with http:// or https://)
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return (
      <a href={href} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  
  // Handle internal links with Next.js Link
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      {children}
    </Link>
  );
};

export default ButtonLinkWrapper;
