const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/syllabus", require("./routes/syllabusRoutes"));
app.use("/api/borrowing", require("./routes/borrowingRoutes"));

// Test Route
app.get("/", (req, res) => {
    res.send("API Running...");
});

// 404 Catch-all
app.use((req, res) => {
    console.log(`404 Not Found: ${req.method} ${req.url}`);
    res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);