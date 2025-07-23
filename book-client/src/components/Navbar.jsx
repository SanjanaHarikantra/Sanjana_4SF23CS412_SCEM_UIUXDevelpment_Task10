import React from 'react';
import { Sun, Moon } from 'lucide-react';

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-indigo-600 text-white dark:bg-indigo-800 shadow-md">
      <div className="text-xl font-semibold">📚 Book Manager</div>

      <ul className="flex gap-6 font-medium">
        <li>
          <a href="#" className="hover:underline">
            Home
          </a>
        </li>
        <li>
          <a href="#add-book" className="hover:underline">
            Add Book
          </a>
        </li>
      </ul>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded hover:bg-indigo-500 dark:hover:bg-indigo-700"
        title="Toggle Dark Mode"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </nav>
  );
};

export default Navbar;
