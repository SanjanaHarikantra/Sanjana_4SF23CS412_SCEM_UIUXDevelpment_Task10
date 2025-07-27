import React from "react";

const Footer = () => {
  return (
    <footer className="bg-indigo-800 p-6 text-center text-white mt-8 text-sm">
      <p>&copy; {new Date().getFullYear()} Book Manager. All rights reserved.</p>
    </footer>
  );
};

export default React.memo(Footer);
