import { type ReactElement } from 'react';
import { getServerSession } from 'next-auth/next';
import { Game } from './Game';
import { Navbar } from './Navbar';
import db from '@/lib/db';
import { authOptions } from '@/lib/auth';

export async function Main(): Promise<ReactElement> {
  const session = await getServerSession(authOptions);

  await db.connect();

  const result = (
    await db.query('SELECT * FROM words ORDER BY RANDOM() LIMIT 1')
  ).rows as Array<{ id: number; word: string }>;

  return (
    <>
      <h1 className="text-xl font-bold sm:mb-8 sm:text-4xl">Hangman</h1>
      <Navbar username={session?.user?.email ?? undefined} />
      <Game word={result[0].word.toUpperCase()} />
    </>
  );
}
