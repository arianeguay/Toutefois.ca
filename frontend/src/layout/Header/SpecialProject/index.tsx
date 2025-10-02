'use client';
import theme from '@/theme';
import { WordpressMenuItem } from '@/types';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { SpecialProjectContainer, SpecialProjectLink } from './styles';

const SpecialProjectMenuItem: React.FC<WordpressMenuItem> = (item) => {
  console.log(item);
  const { name, href, mainColor, previewImage } = item;
  const currentPathname = usePathname();

  const pathName = useMemo(() => {
    let path = new URL(href).pathname;

    if (path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    if (path === currentPathname) {
      return '/';
    }
    return path;
  }, [href, currentPathname]);

  return (
    <SpecialProjectLink href={pathName}>
      <SpecialProjectContainer
        $mainColor={
          pathName === '/' ? theme.colors.headerBackground : mainColor
        }
        $textColor={
          pathName === '/'
            ? theme.colors.buttonSecondaryBackground
            : theme.colors.lightText
        }
        $previewImage={pathName !== '/' ? previewImage : '/logo.png'}
      >
        {pathName !== '/' ? name : 'Théâtre de Toutefois'}
      </SpecialProjectContainer>
    </SpecialProjectLink>
  );
};

export default SpecialProjectMenuItem;
