import { getServerSession } from 'next-auth/next';
import { type ReactElement } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import db from '@/lib/db';
import { Button } from '@/components/ui/button';

export default async function Page(): Promise<ReactElement> {
  const session = await getServerSession(authOptions);

  if (session == null) {
    redirect(`/api/auth/signin`);
  }

  const user = (
    (
      await db.query('SELECT * FROM users WHERE email = $1', [
        session.user?.email,
      ])
    ).rows as Array<{ email: string; id: string }>
  )[0];

  const matches = (
    await db.query(
      'SELECT matches.id, words.word, matches.result FROM matches INNER JOIN words ON matches.word_id = words.id WHERE matches.user_id = $1 ORDER BY matches.id DESC LIMIT 10;',
      [user.id]
    )
  ).rows as Array<{
    id: number;
    result: 'won' | 'lost' | 'in_progress';
    word: string;
  }>;

  const winRate = (
    await db.query(
      `SELECT 
    (SELECT COUNT(*) 
     FROM matches 
     WHERE user_id = $1 AND result = 'won')::float / 
    NULLIF((SELECT COUNT(*) 
             FROM matches 
             WHERE user_id = $1 AND result != 'in_progress'),0) as win_rate;`,
      [user.id]
    )
  ).rows[0] as { win_rate: number };

  return (
    <div className="flex flex-col items-center justify-center pt-7">
      <h2 className="mb-4 text-2xl font-bold">Previous Matches</h2>
      <h3 className="mb-4 text-xl font-bold">
        Win rate: {(winRate.win_rate * 100).toFixed(0)}%
      </h3>
      <div className="flex flex-col items-center justify-center">
        {matches.map((match) => (
          <Link key={match.id} href={`/matches/${match.id}`}>
            <Button
              className="mb-4 flex w-96 items-center justify-between"
              variant="ghost"
            >
              <p className="text-xl font-bold">
                {match.result === 'in_progress' ? '?' : match.word}
              </p>
              <p className="text-xl font-bold">
                {match.result === 'in_progress'
                  ? 'In Progress'
                  : match.result === 'won'
                    ? 'Won'
                    : 'Lost'}
              </p>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
