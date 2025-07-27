import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    bookname: { type: String, required: true, index: true },  // index added
    author: { type: String, required: true, index: true },    // index added
    isbn: { type: String, required: true, unique: true },
    price: { type: Number },
    discount: { type: Number },
    description: { type: String },
    yearOfPublication: { type: Number },
    numberOfPages: { type: Number }
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
