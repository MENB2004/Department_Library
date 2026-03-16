const express = require("express");
const router = express.Router();
// const Borrowing = require("../models/Borrowing");
// const Book = require("../models/Book");
const Borrowing = require("../models/Borrowing");
const Book = require("../models/Book");

// Issue Book
router.post("/issue", async (req, res) => {
    try {
        const { userId, bookId, dueDate } = req.body;
        
        // Check availability
        const book = await Book.findById(bookId);
        if (book.availableCopies <= 0) {
            return res.status(400).json({ message: "Book not available" });
        }

        const borrowing = new Borrowing({
            user: userId,
            book: bookId,
            dueDate: new Date(dueDate),
            status: "issued"
        });

        await borrowing.save();
        
        // Update stock
        book.availableCopies -= 1;
        await book.save();

        res.status(201).json(borrowing);
    } catch (err) {
        res.status(500).json({ message: "Error issuing book" });
    }
});

// Get Borrowing Records (Role-based filters)
router.get("/", async (req, res) => {
    console.log("Hitting GET /api/borrowing");
    try {
        const { userId, status, department } = req.query;
        let query = {};
        if (userId) query.user = userId;
        if (status) query.status = status;

        const records = await Borrowing.find(query)
            .populate("user")
            .populate("book");
            
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: "Error fetching borrowing records" });
    }
});

// Return Book & Calculate Fine
router.put("/return/:id", async (req, res) => {
    try {
        const borrowing = await Borrowing.findById(req.params.id);
        if (!borrowing || borrowing.status === "returned") {
            return res.status(400).json({ message: "Invalid record" });
        }

        borrowing.returnDate = new Date();
        borrowing.status = "returned";
        
        // Calculate fine (e.g., $1 per day overdue)
        const diffTime = borrowing.returnDate - borrowing.dueDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 0) {
            borrowing.fine = diffDays * 2; // Rate: 2 rupees per day
        }

        await borrowing.save();

        // Update stock
        const book = await Book.findById(borrowing.book);
        book.availableCopies += 1;
        await book.save();

        res.json(borrowing);
    } catch (err) {
        res.status(500).json({ message: "Error returning book" });
    }
});

module.exports = router;
