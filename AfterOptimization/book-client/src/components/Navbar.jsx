
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { pathname } = useLocation(); 

  return (
    <nav className="bg-indigo-800 text-white p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold"> Book Management</h1>
        <div className="space-x-4">
          <Link
            to="/"
            className={`hover:underline ${
              pathname === '/' ? 'font-semibold underline' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/add-book"
            className={`hover:underline ${
              pathname === '/add-book' ? 'font-semibold underline' : ''
            }`}
          >
            Add Book
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
