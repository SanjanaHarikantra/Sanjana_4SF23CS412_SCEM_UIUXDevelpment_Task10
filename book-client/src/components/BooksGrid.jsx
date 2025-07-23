// 📁 src/components/BooksGrid.jsx
import React from 'react';
import BookCard from './BookCard';

const BooksGrid = ({ books, onDelete }) => {
  if (!Array.isArray(books)) {
    return <p className="text-red-500 text-center">Books data is not an array!</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book._id} book={book} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default BooksGrid;
