import { WordpressMenuItem } from '@/types';
import { MenuItemLink } from './styles';

const MenuItem: React.FC<WordpressMenuItem> = ({ name, href }) => {
  const getPathFromUrl = (url: string) => {
    try {
      return new URL(url).pathname;
    } catch (e) {
      return url; // Fallback for relative paths or invalid URLs
    }
  };

  return <MenuItemLink href={getPathFromUrl(href)}>{name}</MenuItemLink>;
};

export default MenuItem;
