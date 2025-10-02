'use client';

import { useEffect, useState } from 'react';

interface ClientBlockProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * A component that ensures its children are only rendered on the client
 * This prevents hydration mismatches with complex interactive components
 */
const ClientBlock: React.FC<ClientBlockProps> = ({ 
  children, 
  fallback = <div className="block-placeholder" style={{ minHeight: '50px', width: '100%' }} /> 
}) => {
  // Use a ref to track if we've mounted
  const [hasMounted, setHasMounted] = useState(false);
  
  // Effect runs after hydration
  useEffect(() => {
    // Set a small timeout to ensure full hydration is complete
    const timer = setTimeout(() => {
      setHasMounted(true);
    }, 10); // Small delay to ensure React is done with hydration
    
    return () => clearTimeout(timer);
  }, []);
  
  // During SSR and initial hydration, render nothing to avoid hydration mismatch
  if (!hasMounted) {
    return fallback;
  }
  
  // Once mounted on client, render children
  return <>{children}</>;
};

// Export both as default and named export
export { ClientBlock };
export default ClientBlock;
