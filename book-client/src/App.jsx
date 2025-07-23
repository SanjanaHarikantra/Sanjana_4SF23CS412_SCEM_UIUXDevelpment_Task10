// 📁 src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddBookForm from './components/AddBookForm';
import BooksGrid from './components/BooksGrid';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { motion } from 'framer-motion';

const App = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [darkMode, setDarkMode] = useState(false);

  const fetchBooks = async (pageNum = 1) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/books?page=${pageNum}&limit=6`);
      if (Array.isArray(res.data.books)) {
        setBooks(res.data.books);
        setTotalPages(Math.ceil(res.data.total / res.data.limit));
        setError('');
      } else {
        setError('Books data is not an array!');
      }
    } catch (err) {
      setError('Error fetching books.');
    }
  };

  useEffect(() => {
    fetchBooks(page);
  }, [page]);

  const handleAddBook = async (newBook) => {
    try {
      await axios.post('http://localhost:5000/api/books', newBook);
      fetchBooks(page);
    } catch (err) {
      setError('Error adding book');
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      fetchBooks(page);
    } catch (err) {
      setError('Error deleting book');
    }
  };

  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author} ${book.genre}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className={darkMode ? 'dark bg-gray-900 text-white min-h-screen' : 'bg-gray-100 text-gray-900 min-h-screen'}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <motion.div 
        className="max-w-5xl mx-auto p-6"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-center mb-6">📚 Book Management System</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <AddBookForm onAddBook={handleAddBook} />

        <hr className="my-6 border-gray-300 dark:border-gray-600" />

        <h2 className="text-xl font-semibold text-center mb-4">📗 All Available Books</h2>

        <div className="mb-4 text-center">
          <input
            type="text"
            placeholder="Search by title, author, or genre"
            className="border border-gray-300 rounded px-4 py-2 w-2/3 md:w-1/2 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredBooks.length > 0 ? (
          <>
            <BooksGrid books={filteredBooks} onDelete={handleDeleteBook} />

            <div className="flex justify-center mt-6 gap-4">
              <button
                className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                ⬅️ Previous
              </button>

              <span className="px-4 py-2 font-semibold">
                Page {page} of {totalPages}
              </span>

              <button
                className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
              >
                Next ➡️
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">No books available</p>
        )}
      </motion.div>

      <Footer />
    </div>
  );
};

export default App;
