'use client';

import { SessionProvider } from 'next-auth/react';
import { type ReactElement, type ReactNode } from 'react';

export default function NextAuthProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return <SessionProvider>{children}</SessionProvider>;
}
