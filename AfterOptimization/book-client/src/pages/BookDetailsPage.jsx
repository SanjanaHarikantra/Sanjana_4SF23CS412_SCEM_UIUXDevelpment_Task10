import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import.meta.env.VITE_BASE_URL


const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use your Render backend URL here
  const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const controller = new AbortController();

    const fetchBookDetails = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/books/${id}`, {
          signal: controller.signal,
        });
        setBook(data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        } else {
          console.error("Error fetching book details:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();

    return () => controller.abort();
  }, [id, API_BASE_URL]);

  if (loading)
    return (
      <p className="text-center text-lg font-medium mt-10 text-indigo-600">
        Loading book details...
      </p>
    );

  if (!book)
    return (
      <p className="text-center text-red-500 text-lg mt-10">
        Book not found.
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 py-10 px-4 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white border border-indigo-200 shadow-2xl rounded-2xl p-8 transition-all duration-300">
        <h2 className="text-4xl font-extrabold text-indigo-700 mb-6 text-center">
          {book.bookname}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-lg">
          <p><span className="font-semibold">Author:</span> {book.author}</p>
          <p><span className="font-semibold">ISBN:</span> {book.isbn}</p>
          <p><span className="font-semibold">Price:</span> ₹{book.price}</p>
          <p><span className="font-semibold">Discount:</span> {book.discount}%</p>
          <p><span className="font-semibold">Pages:</span> {book.numberOfPages}</p>
          <p><span className="font-semibold">Published:</span> {book.yearOfPublication}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">Description:</h3>
          <p className="text-gray-600 bg-indigo-50 p-4 rounded-md border border-indigo-200">
            {book.description}
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-block bg-indigo-600 text-white font-medium px-6 py-2 rounded-full shadow-md hover:bg-indigo-700 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
