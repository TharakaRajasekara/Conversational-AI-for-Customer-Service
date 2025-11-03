
import React from 'react';

const BotIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-white"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 7h10a2 2 0 0 1 2 2v1l1 1v3l-1 1v3a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-3l-1 -1v-3l1 -1v-1a2 2 0 0 1 2 -2z" />
    <path d="M10 16h4" />
    <circle cx="8.5" cy="11.5" r=".5" fill="currentColor" />
    <circle cx="15.5" cy="11.5" r=".5" fill="currentColor" />
  </svg>
);

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 shadow-md p-4 flex items-center space-x-4">
      <div className="bg-white/20 p-2 rounded-full">
        <BotIcon />
      </div>
      <div>
        <h1 className="text-xl font-bold text-white">InnovateTech Customer Support</h1>
        <p className="text-sm text-blue-200">Virtual Assistant</p>
      </div>
    </header>
  );
};

export default Header;
