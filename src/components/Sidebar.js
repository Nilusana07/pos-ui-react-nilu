import React from 'react';
import {
  Home,
  ShoppingBag,
  Package, // Products icon
  Truck,
  BarChart2,
  Users,
  Settings,
  LogOut,
  HelpCircle,
} from 'lucide-react';

const Sidebar = () => {
  // Set currentPath to '/' to highlight the Home button as shown in the screenshot
  // In a real application, currentPath would typically come from a router like react-router-dom's useLocation hook
  const currentPath = '/'; // For demonstration, keeping it static.

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Sales', icon: ShoppingBag, path: '/sales' },
    { name: 'Products', icon: Package, path: '/products' }, // This is the "Products" link
    { name: 'Utilities', icon: Truck, path: '/utilities' },
    { name: 'Stocks', icon: BarChart2, path: '/stocks' },
    { name: 'Reports', icon: BarChart2, path: '/reports' },
    { name: 'Users', icon: Users, path: '/users' },
    { name: 'Suppliers', icon: Truck, path: '/suppliers' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div
      className="relative h-full bg-white shadow-lg py-6 px-4 w-64 flex flex-col justify-between rounded-lg"
    >
      {/* POS Name Header */}
      <div className="flex flex-col items-center mb-6 px-2">
        {/* Arrows positioned above POS NAME */}
         <div className="text-gray-400 mb-2 flex justify-center items-center gap-2 cursor-pointer">
         <span style={{ fontSize: '1rem', color: '#ccc' }}>&lt;--</span>
         <span style={{ fontSize: '1rem', color: '#ccc' }}>--&gt;</span>
       </div>
        {/* The actual "POS NAME" text */}
        <h1 className="text-2xl font-bold text-gray-800 tracking-wide">POS NAME</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <a
                href={item.path} // This link navigation will cause ProductsPage to re-render or mount
                className={`
                  flex items-center p-2 rounded-lg text-gray-700
                  hover:bg-green-100 hover:text-green-600 transition-colors duration-200
                  ${
                    currentPath === item.path
                      ? 'bg-green-500 text-white' // Active link: Green background, white text
                      : ''
                  }
                  ${
                    // Add borders for separation as per screenshot
                    (item.name === 'Home' || item.name === 'Sales' || item.name === 'Products')
                      ? 'mb-2 pb-2 border-b border-gray-200' // Border below these items
                      : ''
                  }
                `}
              >
                <item.icon size={20} className="shrink-0" />
                <span className="ml-3 whitespace-nowrap">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <ul>
          <li className="mb-2">
            <a
              href="#"
              className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-green-100 hover:text-green-600 transition-colors duration-200"
            >
              <LogOut size={20} className="shrink-0" />
              <span className="ml-3 whitespace-nowrap">Exit</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 rounded-lg text-gray-700 hover:bg-green-100 hover:text-green-600 transition-colors duration-200"
            >
              <HelpCircle size={20} className="shrink-0" />
              <span className="ml-3 whitespace-nowrap">Help</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
