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
  title: 'Hangman',
  description: 'A simple hangman game.',
  applicationName: 'Hangman',
  authors: [{ name: 'Mehdi Babapour', url: 'https://twitter.com/Mehdibbp' }],
  creator: 'Mehdi Babapour',
  keywords: ['hangman', 'game', 'online-game', 'react', 'nextjs'],
  metadataBase: new URL('https://hangman.mehdibabapour.ir'),
  openGraph: {
    type: 'website',
    url: 'https://hangman.mehdibabapour.ir',
    title: 'Hangman',
    description: 'A simple hangman game.',
    countryName: 'Iran',
    emails: ['mehdibabapour96@gmail.com'],
    siteName: 'Hangman',
  },
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
