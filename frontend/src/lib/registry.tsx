'use client';

import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';
import { createStyleRegistry, StyleRegistry } from 'styled-jsx';

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [jsxStyleRegistry] = useState(() => createStyleRegistry());

  useServerInsertedHTML(() => {
    const styles = jsxStyleRegistry.styles();
    jsxStyleRegistry.flush();
    return <>{styles}</>;
  });

  if (typeof window !== 'undefined') return <>{children}</>;

  return <StyleRegistry registry={jsxStyleRegistry}>{children}</StyleRegistry>;
}
