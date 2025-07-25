import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    name: '',
    author: '',
    isbn: '',
    price: '',
    year: '',
    pages: '',
    discount: '',
    description: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => console.error('Fetch Error:', err));
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/books/${id}`, book)
      .then(() => navigate('/'))
      .catch((err) => console.error('Update Error:', err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Edit Book Details</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-full">
            <label className="block text-sm font-semibold mb-1">Book Name</label>
            <input
              name="name"
              value={book.bookname}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100"
              placeholder="Book Name"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Author</label>
            <input
              name="author"
              value={book.author}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100"
              placeholder="Author"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">ISBN</label>
            <input
              name="isbn"
              value={book.isbn}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100"
              placeholder="ISBN"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Price</label>
            <input
              name="price"
              value={book.price}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
              placeholder="Price"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Year</label>
            <input
              name="year"
              value={book.yearOfPublication}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100"
              placeholder="Year"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Pages</label>
            <input
              name="pages"
              value={book.numberOfPages}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100"
              placeholder="Pages"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Discount (%)</label>
            <input
              name="discount"
              value={book.discount}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
              placeholder="Discount %"
            />
          </div>

          <div className="col-span-full">
            <label className="block text-sm font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={book.description}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg"
              placeholder="Description"
            ></textarea>
          </div>

          <div className="col-span-full flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-semibold px-6 py-2 rounded-lg shadow-lg"
            >
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookPage;
