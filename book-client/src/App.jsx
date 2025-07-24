import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookListPage from './pages/BookListPage';
import AddBookPage from './pages/AddBookPage';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark bg-gray-900 text-white min-h-screen' : 'bg-gray-100 text-gray-900 min-h-screen'}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <Routes>
        <Route path="/" element={<BookListPage />} />
        <Route path="/add-book" element={<AddBookPage />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
