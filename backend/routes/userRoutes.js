const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});



// Get all advisors
router.get("/advisors", async (req, res) => {
    try {
        const advisors = await User.find({ role: "advisor" });
        res.json(advisors);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


// Get all faculty
router.get("/faculty", async (req, res) => {
    try {
        const faculty = await User.find({ role: "faculty" });
        res.json(faculty);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


// Delete user (advisor or faculty)
router.delete("/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Update user
router.put("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;