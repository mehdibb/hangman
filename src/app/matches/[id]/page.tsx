import { getServerSession } from 'next-auth/next';
import { type ReactElement } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import db from '@/lib/db';
import { Game } from '@/components/Game';
import { Button } from '@/components/ui/button';

export default async function Page({
  params,
}: {
  params: { id: string };
}): Promise<ReactElement> {
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

  const match = (
    (
      await db.query(
        'SELECT matches.id, words.word, matches.result FROM matches INNER JOIN words ON matches.word_id = words.id WHERE matches.user_id = $1 AND matches.id = $2',
        [user.id, params.id]
      )
    ).rows as Array<{
      id: number;
      result: 'won' | 'lost' | 'in_progress';
      word: string;
    }>
  )[0];

  if (match.result !== 'in_progress') {
    return (
      <>
        <p className="mb-2">Match already finished.</p>
        <Link href="/">
          <Button>Play a new match</Button>
        </Link>
      </>
    );
  }

  return <Game word={match.word.toUpperCase()} matchId={match.id} />;
}
