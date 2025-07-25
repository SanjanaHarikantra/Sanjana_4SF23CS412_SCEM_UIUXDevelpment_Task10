import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  isbn: String,
  year: Number,
  price: Number,
  discount: Number,
  pages: Number,
  condition: String,
  description: String,
  genre: String,
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
