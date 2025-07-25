import Book from "../models/Book.js";

// Create Book
export const createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Book
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Book (only price, discount, description)
export const updateBook = async (req, res) => {
  try {
    const updatedFields = (({ price, discount, description }) => ({ price, discount, description }))(req.body);

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
      runValidators: true
    });

    if (!updatedBook) return res.status(404).json({ error: "Book not found" });

    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Book
export const deleteBook = async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Book not found" });
    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
