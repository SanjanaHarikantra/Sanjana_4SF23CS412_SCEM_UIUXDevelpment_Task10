import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const AddBookForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    publishedYear: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    await onAdd(form);
    setForm({ title: '', author: '', genre: '', publishedYear: '' });
    setLoading(false);
  }, [form, onAdd]);

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold text-indigo-700 dark:text-indigo-300 mb-4">
        Add New Book
      </h2>

      {['title', 'author', 'genre', 'publishedYear'].map((field) => (
        <div key={field}>
          <label htmlFor={field} className="block mb-1 font-medium capitalize">
            {field === 'publishedYear' ? 'Published Year' : field}
          </label>
          <input
            type={field === 'publishedYear' ? 'number' : 'text'}
            id={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={`Enter ${field}`}
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
      ))}

      <button
        type="submit"
        className={`w-full py-2 px-4 rounded text-white font-semibold transition ${
          loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
        disabled={loading}
      >
        {loading ? 'Adding Book...' : 'Add Book'}
      </button>
    </motion.form>
  );
};

export default React.memo(AddBookForm);
