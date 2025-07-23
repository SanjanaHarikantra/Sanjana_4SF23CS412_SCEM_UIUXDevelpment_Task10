import React, { useState } from 'react';

const AddBookForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    publishedYear: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ title: '', author: '', genre: '', publishedYear: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Add New Book</h2>

      <input type="text" name="title" value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="block w-full border border-gray-300 p-2 mb-3 rounded"
        required
      />
      <input type="text" name="author" value={form.author}
        onChange={handleChange}
        placeholder="Author"
        className="block w-full border border-gray-300 p-2 mb-3 rounded"
        required
      />
      <input type="text" name="genre" value={form.genre}
        onChange={handleChange}
        placeholder="Genre"
        className="block w-full border border-gray-300 p-2 mb-3 rounded"
        required
      />
      <input type="number" name="publishedYear" value={form.publishedYear}
        onChange={handleChange}
        placeholder="Published Year"
        className="block w-full border border-gray-300 p-2 mb-3 rounded"
        required
      />

      <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded">
        Add Book
      </button>
    </form>
  );
};

export default AddBookForm;
