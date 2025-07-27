import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    bookname: { type: String, required: true, index: true },    // Index added for faster search
    author: { type: String, required: true, index: true },      // Index added for faster search
    isbn: { type: String, required: true, unique: true },       // Unique constraint
    price: { type: Number },
    discount: { type: Number },
    description: { type: String },
    yearOfPublication: { type: Number },
    numberOfPages: { type: Number }
  },
  {
    timestamps: true  // Adds createdAt and updatedAt fields
  }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
