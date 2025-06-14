import React from 'react';
import {
  HomeIcon,
  ShoppingBag,
  Package,
  Truck,
  BarChart2,
  Users,
  Settings,
  LogOut,
  Bell,
} from 'lucide-react';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const navItems = [
    { name: 'Home', icon: HomeIcon, path: '#' },
    { name: 'Sales', icon: ShoppingBag, path: '#' },
    { name: 'Products', icon: Package, path: '#' },
    { name: 'Utilities', icon: Truck, path: '#' },
    { name: 'Stocks', icon: BarChart2, path: '#' },
    { name: 'Reports', icon: BarChart2, path: '#' },
    { name: 'Users', icon: Users, path: '#' },
    { name: 'Suppliers', icon: Truck, path: '#' },
    { name: 'Settings', icon: Settings, path: '#' },
  ];

  return (
    <div
      className={`relative h-full bg-white shadow-lg p-4 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      } flex flex-col justify-between rounded-lg`}
    >
      {/* Logo */}
      {!isCollapsed && (
        <div className="flex items-center mb-6 px-2">
          <img
            src="https://placehold.co/40x40/FF7F50/FFFFFF?text=ORG"
            alt="Organia Logo"
            className="mr-2 rounded-md"
          />
          <h1 className="text-xl font-bold text-gray-800">ORGANIA</h1>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <a
                href={item.path}
                className={`flex items-center p-2 rounded-lg text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition-colors duration-200 ${
                  item.name === 'Products' ? 'bg-orange-100 text-orange-600' : ''
                }`}
              >
                <item.icon size={20} className="shrink-0" />
                {!isCollapsed && <span className="ml-3 whitespace-nowrap">{item.name}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-auto">
        <ul>
          <li className="mb-2">
            <a
              href="#"
              className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition-colors duration-200"
            >
              <LogOut size={20} className="shrink-0" />
              {!isCollapsed && <span className="ml-3 whitespace-nowrap">Exit</span>}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-orange-100 hover:text-orange-600 transition-colors duration-200"
            >
              <Bell size={20} className="shrink-0" />
              {!isCollapsed && <span className="ml-3 whitespace-nowrap">Help</span>}
            </a>
          </li>
        </ul>
      </div>

      {/* Toggle Sidebar Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-orange-500 text-white p-1 rounded-full shadow-md hidden sm:block"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Sidebar;
