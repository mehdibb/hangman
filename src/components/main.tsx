import { Database as DatabaseDriver } from 'sqlite3';
import { open, type Database } from 'sqlite';
import { type ReactElement } from 'react';
import { Game } from './Game';

let db: Database | undefined;

export async function Main(): Promise<ReactElement> {
  if (db === undefined) {
    db = await open({
      filename: './hangman.db',
      driver: DatabaseDriver,
    });
  }

  // eslint-disable-next-line
  const {word} = (await db.get(
    'SELECT * FROM words ORDER BY RANDOM() LIMIT 1'
  )) as { id: number; word: string };

  return (
    <>
      <h1 className="mb-8 text-4xl font-bold">Hangman Game</h1>
      <Game word={word.toUpperCase()} />
    </>
  );
}
