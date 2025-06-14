
import TopNavbar from './components/TopNavbar';
import Sidebar from './components/Sidebar';
import Products from './pages/Products';
// src/App.js or src/main.jsx (depending on your project's entry point)
// This is where you would typically import React and its hooks,
// as well as any external libraries like Lucide React for icons.
import React, { useState, useEffect } from 'react';

// --- Start: Lucide React Icon Imports ---
// This section imports all the necessary icons from the 'lucide-react' library.
// Make sure you have installed it: `npm install lucide-react`.
import {
  Home as HomeIcon,
  Package,
  ShoppingBag,
  Truck,
  BarChart2,
  Users,
  Settings,
  LogOut,
  Bell,
  User,
  Search,
  Filter,
  RefreshCcw,
  Edit2,
  ChevronDown,
  PlusCircle,
  BookmarkPlus // Used for the "Add to cart" icon on new item cards
} from 'lucide-react';
// --- End: Lucide React Icon Imports ---

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen font-inter bg-gray-100 p-4 space-x-4">
      {/* Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col space-y-4">
        {/* Top Navigation Bar */}
        <TopNavbar />

        {/* Dynamic Content */}
        <Products />
      </div>
    </div>
  );
}

export default App;
