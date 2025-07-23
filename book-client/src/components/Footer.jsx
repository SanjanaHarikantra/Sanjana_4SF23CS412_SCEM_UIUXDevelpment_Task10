import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-indigo-700 text-white text-center py-4 mt-10">
      <p className="text-sm">&copy; {new Date().getFullYear()} Book Manager. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
