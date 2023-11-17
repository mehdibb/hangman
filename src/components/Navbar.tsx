'use client';

import { type ReactElement } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { Button } from './ui/button';

interface Props {
  username?: string;
}

export const Navbar = ({ username }: Props): ReactElement => {
  return username != null && username !== '' ? (
    <>
      <h2>{username}</h2>
      <Button
        onClick={() => {
          void signOut();
        }}
      >
        Sign Out
      </Button>
    </>
  ) : (
    <Button
      onClick={() => {
        void signIn();
      }}
    >
      Sign In
    </Button>
  );
};
