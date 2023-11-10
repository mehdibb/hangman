import { type ReactElement } from 'react';
import { Main } from '@/components/Main';

export default function Home(): ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center px-24 py-7">
      <Main />
    </main>
  );
}
