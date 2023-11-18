import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { type ReactElement } from 'react';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/Navbar';
import NextAuthProvider from '@/lib/auth-provider';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-full bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <main className="flex min-h-full flex-col items-center px-2 py-4 pt-16 sm:px-24 sm:py-7 sm:pt-16">
          <NextAuthProvider>
            <Navbar />
            {children}
          </NextAuthProvider>
        </main>
      </body>
    </html>
  );
}
