'use client';

import { type ReactElement } from 'react';
import Link from 'next/link';

import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';

export function Navbar(): ReactElement {
  const session = useSession();

  const username = session?.data?.user?.email;
  return (
    <Disclosure
      as="nav"
      className="fixed inset-x-0 top-0 bg-slate-900 text-white"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link href="/" className="flex shrink-0 items-center text-lg">
              Hangman
            </Link>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="relative flex rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <span className="h-8 w-8 rounded-full border border-white pt-[5px] text-[0px] uppercase first-letter:text-sm sm:h-auto sm:w-auto sm:rounded-none sm:border-none sm:pt-0 sm:text-sm sm:normal-case">
                    {username}
                  </span>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/matches"
                          className={cn(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          Matches
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/leaderboard"
                          className={cn(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          Leaderboard
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                  <div>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/api/auth/signout"
                          className={cn(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          Sign out
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
