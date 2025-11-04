import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDebounce } from "use-debounce";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [filterAuthor, setFilterAuthor] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  // ✅ Use Render backend URL or local dev
  const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  const fetchBooks = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/books?page=${page}&limit=${limit}`);
      setBooks(res.data.books || []);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      console.error("Error fetching books", err);
    }
  }, [page, API_BASE_URL]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        const name = book.bookname?.toLowerCase() || "";
        const author = book.author?.toLowerCase() || "";
        return (
          name.includes(debouncedSearchTerm.toLowerCase()) ||
          author.includes(debouncedSearchTerm.toLowerCase())
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
  }, [books, debouncedSearchTerm, filterAuthor, sortKey]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">All Available Books</h1>

      {/* Filters + Search */}
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
              <option key={author} value={author}>
                {author}
              </option>
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-500 text-white text-sm">
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
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No books found.
                </td>
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
                      to={`/book/${book._id}`}
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

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-sm rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-sm rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
