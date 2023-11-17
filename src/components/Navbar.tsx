'use client';

import { type ReactElement } from 'react';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button } from './ui/button';

interface Props {
  username?: string;
}

export const Navbar = ({ username }: Props): ReactElement => {
  return username != null && username !== '' ? (
    <div className="flex items-center justify-center gap-x-2">
      <h2>{username}</h2>
      <Link href={'/matches'}>
        <Button variant="outline">Matches</Button>
      </Link>
      <Button
        variant="outline"
        onClick={() => {
          void signOut();
        }}
      >
        Sign Out
      </Button>
    </div>
  ) : (
    <Button
      variant="outline"
      onClick={() => {
        void signIn();
      }}
    >
      Sign In
    </Button>
  );
};
