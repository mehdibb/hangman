'use client';

import Image from 'next/image';
import { useState, type ReactElement, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LETTERS } from '@/lib/constants';
import { updateMatch } from '@/lib/actions';

interface Props {
  matchId?: number;
  word: string;
}

export const Game = ({ word, matchId }: Props): ReactElement => {
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const wrongGuesses = guessedLetters.filter(
    (letter) => !word.includes(letter)
  ).length;

  const router = useRouter();

  const handlePlayAgain = (): void => {
    setGuessedLetters([]);
    if (matchId == null) {
      router.refresh();
    } else {
      router.push('/');
    }
  };

  useEffect(() => {
    if (wrongGuesses >= 6 && matchId != null) {
      void updateMatch(matchId, 'lost');
    }

    if (
      word.split('').every((letter) => guessedLetters.includes(letter)) &&
      matchId != null
    ) {
      void updateMatch(matchId, 'won');
    }
  }, [guessedLetters, matchId, word, wrongGuesses]);

  return (
    <div className="flex h-full w-full max-w-full grow flex-col rounded-xl p-6 pt-2 shadow-lg sm:pt-6">
      <div className="relative flex h-40 w-full justify-center sm:mb-6 sm:h-96">
        <Image
          alt="Hangman Image"
          priority
          src={`/hangman-stages/${wrongGuesses}.jpg`}
          style={{
            aspectRatio: '1080/1920',
            objectFit: 'contain',
          }}
          fill
        />
      </div>
      <div className="mb-6">
        <p className="text-center text-xl font-semibold">Guess the word:</p>
        <p className="mt-2 text-center text-3xl font-bold">
          {wrongGuesses >= 6
            ? word
            : word
                .split('')
                .map((letter) =>
                  guessedLetters.includes(letter) ? letter : '_'
                )
                .join(' ')}
        </p>
        {wrongGuesses >= 6 ? (
          <div className="flex flex-col items-center">
            <p className="mt-2 font-semibold text-red-600">You lost!</p>
            <Button className="mt-4" onClick={handlePlayAgain}>
              Play Again
            </Button>
          </div>
        ) : word
            .split('')
            .every((letter) => guessedLetters.includes(letter)) ? (
          <div className="flex flex-col items-center">
            <p className="mt-2 font-semibold text-green-600">You won!</p>
            <Button className="mt-4" onClick={handlePlayAgain}>
              Play Again
            </Button>
          </div>
        ) : null}
      </div>
      <div className="mt-auto flex flex-wrap justify-center gap-x-4 gap-y-1 sm:gap-y-4">
        {LETTERS.map((letter) => (
          <Button
            disabled={guessedLetters.includes(letter) || wrongGuesses >= 6}
            className="w-16"
            key={letter}
            onClick={() => {
              setGuessedLetters([...guessedLetters, letter]);
            }}
          >
            {letter}
            {guessedLetters.includes(letter) &&
            !word.split('').includes(letter) ? (
              <X className="ml-2 h-4 w-4 text-red-600" />
            ) : guessedLetters.includes(letter) ? (
              <Check className="ml-2 h-4 w-4 text-green-600" />
            ) : null}
          </Button>
        ))}
      </div>
    </div>
  );
};
