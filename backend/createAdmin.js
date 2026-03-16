const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("MongoDB Connected");

        const existingAdmin = await User.findOne({ role : "user" });

        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);

        const admin = new User({
            name: "System Admin",
            username: "admin",
            password: hashedPassword,
            role: "admin",
        });

        await admin.save();

        console.log("Admin created successfully!");
        process.exit();
    })
    .catch((err) => {
        console.error("Database connection error:", err);
        process.exit(1);
    });