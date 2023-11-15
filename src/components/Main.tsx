import { type ReactElement } from 'react';
import { Game } from './Game';
import db from '@/lib/db';

export async function Main(): Promise<ReactElement> {
  const result = (
    await db.query('SELECT * FROM words ORDER BY RANDOM() LIMIT 1')
  ).rows as Array<{ id: number; word: string }>;

  return (
    <>
      <h1 className="text-xl font-bold sm:mb-8 sm:text-4xl">Hangman</h1>
      <Game word={result[0].word.toUpperCase()} />
    </>
  );
}
