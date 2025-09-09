'use client';

import { useEffect, useMemo, useState } from 'react';
import { PageContainer } from './styles';

const PageWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const opacity = useMemo(() => (mounted ? 1 : 0), [mounted]);
  return <PageContainer style={{ opacity }}>{children}</PageContainer>;
};

export default PageWrapper;
