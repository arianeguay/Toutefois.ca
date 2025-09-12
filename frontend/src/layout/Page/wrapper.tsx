'use client';

import { useEffect, useMemo, useState } from 'react';
import { PageContainer } from './styles';

interface PageWrapperProps extends React.PropsWithChildren {
  template?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, template }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const opacity = useMemo(() => (mounted ? 1 : 0), [mounted]);
  return (
    <PageContainer template={template} style={{ opacity }}>
      {children}
    </PageContainer>
  );
};

export default PageWrapper;
