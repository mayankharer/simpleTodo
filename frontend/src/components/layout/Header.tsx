import React from 'react';
import { CheckCircleIcon } from 'lucide-react';
const Header: React.FC = () => {
  return <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md">
      <div className="container mx-auto px-4 py-6 sm:px-6 md:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-white" />
            <h1 className="ml-2 text-2xl font-bold text-white">TaskApp</h1>
          </div>
          <div className="text-white text-sm">
            <span className="hidden sm:inline">
              Organize your tasks efficiently
            </span>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;