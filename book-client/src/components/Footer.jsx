import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-indigo-700 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} <span className="font-semibold">Book Manager</span>. All rights reserved.
        </p>
        <p className="text-sm mt-2 md:mt-0 text-center md:text-right">
          Built with ❤️ using MERN Stack
        </p>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
