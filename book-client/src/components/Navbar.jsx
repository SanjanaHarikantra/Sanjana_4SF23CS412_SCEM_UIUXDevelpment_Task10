import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ darkMode, setDarkMode }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/add-book', label: 'Add Book' },
  ];

  return (
    <nav className="bg-indigo-600 dark:bg-gray-800 shadow-md text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Branding */}
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold">📚 Book Manager</h1>

          {/* Navigation Links */}
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm hover:underline transition ${
                location.pathname === item.path ? 'font-bold underline' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-white dark:bg-gray-700 text-indigo-600 dark:text-white px-3 py-1 rounded hover:opacity-90 transition"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? '🌞 Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
