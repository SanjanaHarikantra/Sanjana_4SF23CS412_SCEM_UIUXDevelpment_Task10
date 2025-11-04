import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import compression from "compression";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bookRoutes from "./routes/bookRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Use Render’s provided PORT or default to 5000 locally
const PORT = process.env.PORT || 5000;

// CORS: allow all origins (no credentials)
app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: false,
  })
);
app.use(bodyParser.json());
app.use(compression());

// API Routes
app.use("/api/books", bookRoutes);

// Connect MongoDB
connectDB();

// Default route (health check)
app.get("/", (req, res) => {
  res.send("Book Management Backend is running successfully.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
