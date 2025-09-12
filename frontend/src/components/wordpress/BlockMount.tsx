'use client';

import { useEffect } from 'react';

// Import mount scripts for all custom blocks here
import '@/components/blocks/CollaboratorsBlock/mount';

const BlockMount = () => {
  // This component's purpose is to ensure the mount scripts are included
  // in the client-side bundle and executed. It does not render any UI.
  useEffect(() => {
    // The mount scripts handle their own DOMContentLoaded listeners.
  }, []);

  return null;
};

export default BlockMount;
