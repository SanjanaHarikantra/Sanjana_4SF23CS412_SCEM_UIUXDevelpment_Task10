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

// Get Books (with pagination, search, sort)
export const getBooks = async (req, res) => {
  try {
    const { search, page = 1, limit = 6, sort = "createdAt", order = "desc" } = req.query;
    const skip = (page - 1) * limit;

    const query = search
      ? {
          $or: [
            { bookname: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } }
          ]
        }
      : {};

    const books = await Book.find(query)
      .sort({ [sort]: order === "asc" ? 1 : -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    const total = await Book.countDocuments(query);

    res.status(200).json({
      books,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Book
export const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete Book
export const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
