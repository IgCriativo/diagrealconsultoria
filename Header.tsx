
import React from 'react';
import { REAL_CONSULTORIA_BRAND_NAME } from '../constants';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-black text-brand-accent p-4 sm:p-6 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-end">
        <h1 className="text-xl sm:text-3xl font-bold text-center sm:text-left">{title}</h1>
        <p className="text-xs sm:text-md text-brand-accent opacity-80 mt-2 sm:mt-0 sm:ml-4 whitespace-nowrap">{REAL_CONSULTORIA_BRAND_NAME}</p>
      </div>
    </header>
  );
};

export default Header;
