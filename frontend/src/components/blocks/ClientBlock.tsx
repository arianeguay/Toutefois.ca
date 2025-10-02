'use client';

import { useEffect, useMemo, useState } from 'react';

interface ClientBlockProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * A component that ensures its children are only rendered on the client
 * This prevents hydration mismatches with complex interactive components
 */
const ClientBlock: React.FC<ClientBlockProps> = ({ children, style }) => {
  // Use a ref to track if we've mounted
  const [hasMounted, setHasMounted] = useState(false);

  // Effect runs after hydration
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const opacity = useMemo(() => (hasMounted ? 1 : 0), [hasMounted]);

  // Once mounted on client, render children
  return (
    <div style={{ opacity, transition: 'opacity 0.5s ease', ...style }}>
      {children}
    </div>
  );
};

// Export both as default and named export
export { ClientBlock };
export default ClientBlock;
