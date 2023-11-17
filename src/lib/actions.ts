'use server';

import db from './db';

export async function updateMatch(
  matchId: number,
  result: 'won' | 'lost'
): Promise<void> {
  await db.query('UPDATE matches SET result = $1 WHERE id = $2', [
    result,
    matchId,
  ]);
}
