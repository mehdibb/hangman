import EmailProvider from 'next-auth/providers/email';
import PostgresAdapter from '@auth/pg-adapter';
import { type Adapter } from 'next-auth/adapters';
import { type AuthOptions } from 'next-auth';
import db from '@/lib/db';

export const authOptions: AuthOptions = {
  adapter: PostgresAdapter(db) as Adapter,
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
};
