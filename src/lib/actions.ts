'use server';

import db from './db';

// FIXME: This action needs authentication otherwise anyone can update the
// result of a match.
export async function updateMatch(
  matchId: number,
  result: 'won' | 'lost'
): Promise<void> {
  await db.query('UPDATE matches SET result = $1 WHERE id = $2', [
    result,
    matchId,
  ]);
}
