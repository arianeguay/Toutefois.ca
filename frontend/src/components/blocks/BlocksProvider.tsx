'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface BlocksContextType {
  isMounted: boolean;
}

const BlocksContext = createContext<BlocksContextType>({
  isMounted: false,
});

export const useBlocksContext = () => useContext(BlocksContext);

export const BlocksProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  // Track client-side mounting to prevent hydration mismatches
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <BlocksContext.Provider value={{ isMounted }}>
      {children}
    </BlocksContext.Provider>
  );
};

export default BlocksProvider;
