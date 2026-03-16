const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// Add Book
router.post("/", async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: "Error adding book" });
    }
});

// Get All Books
router.get("/", async (req, res) => {
    try {
        const { semester } = req.query;
        let filter = {};
        if (semester) {
            filter.semester = semester;
        }
        const books = await Book.find(filter);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Delete Book
router.delete("/:id", async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
});

// Update Book
router.put("/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" });
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: "Error updating book" });
    }
});

module.exports = router;