
import React, { Dispatch, SetStateAction } from 'react';
import type { Page } from '../types';
import { UserGroupIcon } from './icons/UserGroupIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { ClipboardListIcon } from './icons/ClipboardListIcon';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const navItems: { name: Page; icon: React.FC<{className?: string}> }[] = [
  { name: 'Data Siswa', icon: UserGroupIcon },
  { name: 'Mata Pelajaran', icon: BookOpenIcon },
  { name: 'Absensi', icon: ClipboardListIcon },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isOpen, setOpen }) => {
  const NavLink: React.FC<{ item: { name: Page; icon: React.FC<{className?: string}> } }> = ({ item }) => {
    const isActive = currentPage === item.name;
    return (
      <button
        onClick={() => {
            setCurrentPage(item.name);
            setOpen(false);
        }}
        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
          isActive
            ? 'bg-indigo-600 text-white shadow-md'
            : 'text-gray-600 hover:bg-indigo-100 hover:text-indigo-700'
        }`}
      >
        <item.icon className="h-5 w-5 mr-3" />
        <span>{item.name}</span>
      </button>
    );
  };
  
  return (
    <>
      <div className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setOpen(false)}></div>
      <aside className={`absolute md:relative z-30 flex-shrink-0 w-64 bg-white border-r border-gray-200 flex-col h-full transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:flex`}>
        <div className="flex items-center justify-center h-20 border-b">
          <h1 className="text-2xl font-bold text-indigo-600">PenilaianApp</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </nav>
      </aside>
    </>
  );
};
