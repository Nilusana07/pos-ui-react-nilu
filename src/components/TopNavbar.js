import React from 'react';
import { Bell, User, Search } from 'lucide-react';

// This component renders the top bar with search, profile, and notification icons.
const TopNavbar = () => {
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
      {/* POS Name / Branding */}
      <div className="flex items-center">
        <span className="text-gray-500 mr-2">POS</span>
        <span className="font-bold text-gray-800">NAME</span>
      </div>

      {/* Search Input */}
      <div className="relative flex-grow mx-4 max-w-xl">
        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Q Search Products"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
        />
      </div>

      {/* Right side icons and "Bill" label */}
      <div className="flex items-center space-x-4">
        <Bell size={24} className="text-gray-600 hover:text-orange-500 cursor-pointer" />
        <User size={24} className="text-gray-600 hover:text-orange-500 cursor-pointer" />
        <span className="text-gray-500">|</span>
        <span className="text-xl font-semibold text-gray-800">Bill</span>
      </div>
    </div>
  );
};

export default TopNavbar;

