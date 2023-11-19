import { type ReactElement } from 'react';
import db from '@/lib/db';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
    <Table>
      <TableCaption>Leaderboard</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Win Rate</TableHead>
          <TableHead>Total Matches</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((row, i) => (
          <TableRow key={row.email}>
            <TableCell>{i}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{Math.round(row.winrate * 100)}%</TableCell>
            <TableCell>{row.total_matches}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
