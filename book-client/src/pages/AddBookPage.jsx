import React, { useState } from "react";
import axios from "axios";

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    bookname: "",
    author: "",
    isbn: "",
    price: "",
    discount: "",
    description: "",
    yearOfPublication: "",
    numberOfPages: ""
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    const payload = { ...formData };
    if (!payload.discount) delete payload.discount;

    try {
      await axios.post("http://localhost:5000/api/books", payload);
      setSuccessMsg("✅ Book added successfully!");
      setFormData({
        bookname: "",
        author: "",
        isbn: "",
        price: "",
        discount: "",
        description: "",
        yearOfPublication: "",
        numberOfPages: ""
      });
    } catch (error) {
      setErrorMsg(error.response?.data?.error || "❌ Error adding book");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="w-full max-w-2xl bg-white/70 dark:bg-gray-900/80 backdrop-blur-md shadow-xl rounded-3xl p-8 sm:p-10 border border-gray-300 dark:border-gray-700 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-indigo-700 dark:text-indigo-300 mb-6">
          📚 Add a New Book
        </h2>

        {successMsg && (
          <div className="mb-4 text-green-700 bg-green-100 border border-green-300 px-4 py-2 rounded-lg text-center text-sm font-semibold shadow-sm">
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="mb-4 text-red-700 bg-red-100 border border-red-300 px-4 py-2 rounded-lg text-center text-sm font-semibold shadow-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { label: "Book Name", name: "bookname" },
            { label: "Author", name: "author" },
            { label: "ISBN", name: "isbn" },
            { label: "Price", name: "price", type: "number" },
            { label: "Discount (%)", name: "discount", type: "number", optional: true },
            { label: "Year of Publication", name: "yearOfPublication", type: "number" },
            { label: "Number of Pages", name: "numberOfPages", type: "number" },
          ].map(({ label, name, type = "text", optional }) => (
            <div key={name} className="relative">
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                {...(!optional && { required: true })}
                className="peer w-full px-4 pt-6 pb-2 text-sm bg-white/60 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-transparent transition-all duration-200"
                placeholder={label}
              />
              <label
                className="absolute left-4 top-2 text-gray-600 dark:text-gray-300 text-xs font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600 dark:peer-focus:text-indigo-300"
              >
                {label}
              </label>
            </div>
          ))}

          <div className="sm:col-span-2 relative">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
    
              className="peer w-full px-4 pt-6 pb-2 text-sm bg-white/60 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-transparent transition-all duration-200"
              placeholder="Description"
            />
            <label
              className="absolute left-4 top-2 text-gray-600 dark:text-gray-300 text-xs font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-indigo-600 dark:peer-focus:text-indigo-300"
            >
              Description
            </label>
          </div>

          <div className="sm:col-span-2 flex justify-center mt-2">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transform hover:scale-105 transition duration-200 ease-in-out"
            >
              ➕ Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
