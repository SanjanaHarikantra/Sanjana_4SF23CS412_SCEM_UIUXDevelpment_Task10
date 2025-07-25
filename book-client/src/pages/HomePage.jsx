import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [sortKey, setSortKey] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const filteredBooks = books
    .filter((book) => {
      const name = book.name?.toLowerCase() || "";
      const author = book.author?.toLowerCase() || "";
      return (
        name.includes(searchTerm.toLowerCase()) ||
        author.includes(searchTerm.toLowerCase())
      );
    })
    .filter((book) => (filterAuthor ? book.author === filterAuthor : true))
    .sort((a, b) => {
  if (sortKey === "price") return a.price - b.price;
  if (sortKey === "name") {
    const nameA = a.bookname || "";
    const nameB = b.bookname || "";
    return nameA.localeCompare(nameB);
  }
  return 0;
});


  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">All Available Books</h1>

      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {/* Filter */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Filter by Author:</label>
          <select
            value={filterAuthor}
            onChange={(e) => setFilterAuthor(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">All</option>
            {[...new Set(books.map((b) => b.author))].map((author) => (
              <option key={author} value={author}>{author}</option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Sort By:</label>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">None</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </div>

        {/* Search */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Search:</label>
          <input
            type="text"
            placeholder="Search by name or author"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md w-72"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-800 text-white text-sm">
            <tr>
              <th className="py-3 px-4 text-left">ISBN</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Author</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">No books found.</td>
              </tr>
            ) : (
              filteredBooks.map((book, index) => (
                <tr key={book._id} className="border-t hover:bg-gray-50 text-sm">
                  <td className="px-4 py-3">{book.isbn || index + 1}</td>
                  <td className="px-4 py-3">{book.bookname}</td>
                  <td className="px-4 py-3">{book.author}</td>
                  <td className="px-4 py-3">₹{book.price}</td>
                  <td className="px-4 py-3 space-x-2">
                    <Link
                      to={`/book-details/${book._id}`}
                      className="inline-block bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md"
                    >
                      Details
                    </Link>
                    <Link
                      to={`/edit-book/${book._id}`}
                      className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-md"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
