import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js";
import compression from 'compression';
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
// Use compression middleware
app.use(compression());

// Routes
app.use("/api/books", bookRoutes);

// DB + Server
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
