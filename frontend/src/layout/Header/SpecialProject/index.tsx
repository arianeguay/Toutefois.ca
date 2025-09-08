import { WordpressMenuItem } from '@/types';
import Link from 'next/link';
import { SpecialProjectContainer } from './styles';

const SpecialProjectMenuItem: React.FC<WordpressMenuItem> = ({
  name,
  href,
  mainColor,
  previewImage,
}) => {
  const getPathFromUrl = (url: string) => {
    try {
      return new URL(url).pathname;
    } catch (e) {
      return url; // Fallback for relative paths or invalid URLs
    }
  };
  return (
    <Link href={getPathFromUrl(href)}>
      <SpecialProjectContainer
        $mainColor={mainColor}
        $previewImage={previewImage}
      >
        {name}
      </SpecialProjectContainer>
    </Link>
  );
};

export default SpecialProjectMenuItem;
