
import React from 'react';
import { MenuIcon } from './icons/MenuIcon';
import type { Page } from '../types';

interface HeaderProps {
  toggleSidebar: () => void;
  currentPage: Page;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, currentPage }) => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between p-4 h-16">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Toggle sidebar"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">{currentPage}</h1>
        <div className="w-8"></div>
      </div>
    </header>
  );
};
