const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
router.post("/register", async (req, res) => {
    try {
        console.log("Register Request Body:", req.body);

        const {
            name,
            username,
            password,
            role,
            email,
            batch,
            semester,
            isAdvisor,
            advisoryClass,
            advisorySemester,
            registerNo
        } = req.body;

        if (!username || !password || !role) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name || username,
            username,
            password: hashedPassword,
            role,
            email,
            department: "Computer Science", // Forced
            batch,
            semester,
            isAdvisor: isAdvisor || false,
            advisoryClass: isAdvisor ? advisoryClass : null,
            advisorySemester: isAdvisor ? advisorySemester : null,
            registerNo: registerNo || null,
        });

        await newUser.save();

        res.json({ message: `${role} added successfully` });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
    try {
        console.log("Login Request Body:", req.body);

        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                role: user.role,
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});


// ================= LOGOUT =================
router.post("/logout", (req, res) => {
    res.json({ message: "Logout successful" });
});

module.exports = router;