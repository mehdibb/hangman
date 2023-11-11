import { type ReactElement } from 'react';
import { Main } from '@/components/Main';

export default function Home(): ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center px-2 py-4 sm:px-24 sm:py-7">
      <Main />
    </main>
  );
}

export const revalidate = 0;
