import { type ReactElement } from 'react';
import { getServerSession } from 'next-auth/next';
import { Game } from './Game';
import { Navbar } from './Navbar';
import db from '@/lib/db';
import { authOptions } from '@/lib/auth';

export async function Main(): Promise<ReactElement> {
  const session = await getServerSession(authOptions);

  const chosenWord = (
    (await db.query('SELECT * FROM words ORDER BY RANDOM() LIMIT 1'))
      .rows as Array<{ id: number; word: string }>
  )[0];

  if (session != null) {
    const user = (
      (
        await db.query('SELECT * FROM users WHERE email = $1', [
          session.user?.email,
        ])
      ).rows as Array<{ email: string; id: string }>
    )[0];

    await db.query('INSERT INTO matches (user_id, word_id) VALUES ($1, $2)', [
      user.id,
      chosenWord.id,
    ]);
  }

  return (
    <>
      <h1 className="text-xl font-bold sm:mb-8 sm:text-4xl">Hangman</h1>
      <Navbar username={session?.user?.email ?? undefined} />
      <Game word={chosenWord.word.toUpperCase()} />
    </>
  );
}
