const express = require("express");
const router = express.Router();
const Syllabus = require("../models/Syllabus");

// Create Syllabus
router.post("/", async (req, res) => {
    try {
        const syllabus = new Syllabus(req.body);
        await syllabus.save();
        res.status(201).json(syllabus);
    } catch (err) {
        res.status(500).json({ message: "Error creating syllabus" });
    }
});

// Get All Syllabuses (with filters)
router.get("/", async (req, res) => {
    try {
        const { department, semester } = req.query;
        let query = {};
        if (department) query.department = department;
        if (semester) query.semester = semester;
        
        const syllabuses = await Syllabus.find(query).populate("mappedBooks");
        res.json(syllabuses);
    } catch (err) {
        res.status(500).json({ message: "Error fetching syllabuses" });
    }
});

// Map Book to Syllabus
router.put("/:id/map-book", async (req, res) => {
    try {
        const { bookId } = req.body;
        const syllabus = await Syllabus.findById(req.params.id);
        if (!syllabus.mappedBooks.includes(bookId)) {
            syllabus.mappedBooks.push(bookId);
            await syllabus.save();
        }
        res.json(syllabus);
    } catch (err) {
        res.status(500).json({ message: "Error mapping book" });
    }
});

// Delete Syllabus
router.delete("/:id", async (req, res) => {
    try {
        await Syllabus.findByIdAndDelete(req.params.id);
        res.json({ message: "Syllabus deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting syllabus" });
    }
});

module.exports = router;
