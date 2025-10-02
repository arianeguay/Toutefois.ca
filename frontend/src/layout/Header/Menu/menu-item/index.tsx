'use client';
import { WordpressMenuItem } from '@/types';
import { usePathname } from 'next/navigation';
import { MenuItemLink } from './styles';

const MenuItem: React.FC<WordpressMenuItem> = ({ name, href }) => {
  const pathname = usePathname();
  const getPathFromUrl = (url: string) => {
    try {
      const path = new URL(url).pathname;
      return path.endsWith('/') ? path.slice(0, -1) : path;
    } catch (e) {
      return url; // Fallback for relative paths or invalid URLs
    }
  };

  return (
    <MenuItemLink
      href={getPathFromUrl(href)}
      $isActive={pathname === getPathFromUrl(href)}
    >
      {name}
    </MenuItemLink>
  );
};

export default MenuItem;
