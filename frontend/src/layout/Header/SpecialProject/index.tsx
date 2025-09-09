'use client';
import { WordpressMenuItem } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { useTheme } from 'styled-components';
import { SpecialProjectContainer } from './styles';

const SpecialProjectMenuItem: React.FC<WordpressMenuItem> = ({
  name,
  href,
  mainColor,
  previewImage,
}) => {
  const currentPathname = usePathname();
  const theme = useTheme();
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

  console.log(pathName, currentPathname);
  return (
    <Link href={pathName}>
      <SpecialProjectContainer
        $mainColor={
          pathName === '/' ? theme.colors.headerBackground : mainColor
        }
        $textColor={
          pathName === '/'
            ? theme.colors.buttonSecondaryBackground
            : theme.colors.primaryText
        }
        $previewImage={pathName !== '/' ? previewImage : '/logo.png'}
      >
        {pathName !== '/' ? name : 'Théâtre de Toutefois'}
      </SpecialProjectContainer>
    </Link>
  );
};

export default SpecialProjectMenuItem;
