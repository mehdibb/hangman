import { type ReactElement } from 'react';
import { getServerSession } from 'next-auth/next';
import { Game } from './Game';
import db from '@/lib/db';
import { authOptions } from '@/lib/auth';

export async function Main(): Promise<ReactElement> {
  const session = await getServerSession(authOptions);

  const chosenWord = (
    (await db.query('SELECT * FROM words ORDER BY RANDOM() LIMIT 1'))
      .rows as Array<{ id: number; word: string }>
  )[0];

  let match: { id: number } | undefined;

  if (session != null) {
    const user = (
      (
        await db.query('SELECT * FROM users WHERE email = $1', [
          session.user?.email,
        ])
      ).rows as Array<{ email: string; id: string }>
    )[0];

    await db.query(
      `DELETE FROM matches 
          WHERE id = (
              SELECT id 
              FROM matches
              WHERE user_id = $1 AND result = 'in_progress' 
              ORDER BY match_timestamp DESC 
              LIMIT 1
        );`,
      [user.id]
    );

    match = (
      await db.query(
        'INSERT INTO matches (user_id, word_id) VALUES ($1, $2) RETURNING id;',
        [user.id, chosenWord.id]
      )
    ).rows[0] as { id: number };
  }

  return <Game word={chosenWord.word.toUpperCase()} matchId={match?.id} />;
}
