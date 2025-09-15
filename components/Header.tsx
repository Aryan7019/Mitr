// components/Header.tsx
'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

const Header = () => {
  const { isSignedIn } = useUser();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-indigo-800">
          MITR
        </Link>
        
        <div className="flex items-center space-x-6">
          {isSignedIn ? (
            <>
              <Link href="/dashboard">
                <button className="text-gray-700 hover:text-indigo-600">
                  Dashboard
                </button>
              </Link>
              <Link href="/resources">
                <button className="text-gray-700 hover:text-indigo-600">
                  Resources
                </button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <div className="flex space-x-2">
              <Link href="/sign-in">
                <button className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-bold py-2 px-4 rounded-full">
                  Sign In
                </button>
              </Link>
              <Link href="/sign-up">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;