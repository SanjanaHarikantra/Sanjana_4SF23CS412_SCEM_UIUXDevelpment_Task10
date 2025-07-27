import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  bookname: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  discount: { type: Number }, // optional
  description: { type: String }, // optional
  yearOfPublication: { type: Number, required: true },
  numberOfPages: { type: Number, required: true }
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
