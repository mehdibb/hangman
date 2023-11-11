import { type ReactElement } from 'react';
import { createClient } from '@libsql/client/web';
import { Game } from './Game';

const config = {
  url: process.env.DB_URL ?? '',
  authToken: process.env.DB_AUTH_TOKEN ?? '',
};

const db = createClient(config);

export async function Main(): Promise<ReactElement> {
  // eslint-disable-next-line
  const result = await db.execute(
    'SELECT * FROM words ORDER BY RANDOM() LIMIT 1'
  );

  return (
    <>
      <h1 className="text-xl font-bold sm:mb-8 sm:text-4xl">Hangman</h1>
      <Game word={result.rows[0].word?.toString().toUpperCase() ?? ''} />
    </>
  );
}
