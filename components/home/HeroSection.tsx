// components/home/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';
import { SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle }) => {
  return (
    <motion.div 
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-5xl font-bold text-indigo-800 mb-4">{title}</h1>
      <p className="text-xl text-gray-700 mb-8">{subtitle}</p>
      
      <div className="flex justify-center space-x-4">
        <SignedOut>
          <SignUpButton mode="modal">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
          </SignUpButton>
          <SignInButton mode="modal">
            <button className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-bold py-3 px-6 rounded-full text-lg transition-all duration-300">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link href="/dashboard">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
              Go to Dashboard
            </button>
          </Link>
        </SignedIn>
      </div>
    </motion.div>
  );
};

export default HeroSection;