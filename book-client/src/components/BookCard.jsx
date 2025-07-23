// 📁 src/components/BookCard.jsx
import React, { useState } from 'react';
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react';

const BookCard = ({ book, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 flex flex-col justify-between h-full">
      <div>
        <h3 className="text-2xl font-bold text-center text-indigo-700 mb-4">{book.title}</h3>

        <p className="text-gray-700 mb-2">
          👨‍💼 <span className="font-medium">Author:</span> {book.author}
        </p>

        {showDetails && (
          <div className="text-gray-600 text-sm space-y-1 mt-3">
            <p>🎭 <span className="font-medium">Genre:</span> {book.genre}</p>
            <p>📅 <span className="font-medium">Published:</span> {book.publishedYear}</p>
            <p>🆔 <span className="font-medium">ID:</span> {book._id}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          {showDetails ? (
            <span className="inline-flex items-center gap-1"><EyeOff size={16} /> Hide</span>
          ) : (
            <span className="inline-flex items-center gap-1"><Eye size={16} /> View</span>
          )}
        </button>

        <button
          onClick={() => onDelete(book._id)}
          className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition inline-flex items-center gap-1"
        >
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
};

export default BookCard;
