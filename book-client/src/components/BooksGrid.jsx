// 📁 src/components/BooksGrid.jsx
import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';

const BooksGrid = React.memo(({ books, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 dark:border-gray-600">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Author</th>
            <th className="px-4 py-2 text-left">Genre</th>
            <th className="px-4 py-2 text-left">Published Year</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white dark:bg-gray-800 dark:text-white">
          {books.map((book) => (
            <tr key={book._id} className="border-t border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">{book.title}</td>
              <td className="px-4 py-2">{book.author}</td>
              <td className="px-4 py-2">{book.genre}</td>
              <td className="px-4 py-2">{book.publishedYear}</td>
              <td className="px-4 py-2 space-x-2 whitespace-nowrap">
                {/* View Details */}
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded inline-flex items-center"
                  onClick={() =>
                    alert(
                      `📖 Title: ${book.title}\n👨‍💼 Author: ${book.author}\n🎭 Genre: ${book.genre}\n📅 Year: ${book.publishedYear}`
                    )
                  }
                >
                  <Eye className="w-4 h-4 mr-1" /> View
                </button>

                {/* Edit Placeholder */}
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded inline-flex items-center"
                  onClick={() => alert('✏️ Edit functionality coming soon!')}
                >
                  <Pencil className="w-4 h-4 mr-1" /> Edit
                </button>

                {/* Delete */}
                <button
                  onClick={() => onDelete(book._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded inline-flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default BooksGrid;
