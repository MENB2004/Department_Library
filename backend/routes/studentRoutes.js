const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get all students
// Get students with filters
router.get("/", async (req, res) => {
    try {
        const { search, department, semester } = req.query;
        console.log("Students API called with:", { search, department, semester });

        let filter = { role: "student" };

        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        if (department) {
            filter.department = department;
        }

        if (semester) {
            filter.semester = semester;
        }

        console.log("Applying filter to User model:", filter);
        const students = await User.find(filter);
        console.log(`Found ${students.length} students.`);
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Delete student
router.delete("/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "Student deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// ================= UPDATE STUDENT =================
router.put("/:id", async (req, res) => {
    try {
        const {
            name,
            username,
            email,
            department,
            semester,
            batch,
            registerNo
        } = req.body;

        const updatedStudent = await User.findByIdAndUpdate(
            req.params.id,
            {
                name,
                username,
                email,
                department,
                semester,
                batch,
                registerNo
            },
            { returnDocument: "after" }
        );

        res.json(updatedStudent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;