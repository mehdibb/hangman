import { type ReactElement } from 'react';
import db from '@/lib/db';

export const revalidate = 0;

export default async function Page(): Promise<ReactElement> {
  const items = (
    await db.query(`
      SELECT 
      users.email, 
      COUNT(*) FILTER (WHERE result = 'won')::float / COUNT(*) FILTER (WHERE result != 'in_progress') as winrate,
      COUNT(*) FILTER (WHERE result != 'in_progress') as total_matches
      FROM matches
      INNER JOIN users ON users.id = matches.user_id
      GROUP BY users.email
      HAVING COUNT(*) FILTER (WHERE result != 'in_progress') >= 10
      ORDER BY winrate DESC;
    `)
  ).rows as Array<{
    email: string;
    total_matches: number;
    winrate: number;
  }>;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Leaderboard</h1>
        <table className="mt-4 table-auto border-collapse border border-gray-900">
          <thead>
            <tr>
              <th className="border border-gray-900 px-4 py-2">Username</th>
              <th className="border border-gray-900 px-4 py-2">Win rate</th>
              <th className="border border-gray-900 px-4 py-2">
                Total matches
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={row.email}>
                <td className="border border-gray-900 px-4 py-2">
                  {row.email}
                </td>
                <td className="border border-gray-900 px-4 py-2">
                  {Math.round(row.winrate * 100)}%
                </td>
                <td className="border border-gray-900 px-4 py-2">
                  {row.total_matches}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
