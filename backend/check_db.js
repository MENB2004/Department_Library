const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const students = await User.find({ role: "student" });
        console.log(`Found ${students.length} students in total.`);
        
        if (students.length > 0) {
            console.log("First student record:", JSON.stringify(students[0], null, 2));
        } else {
            const allUsers = await User. find();
            console.log(`Total users in DB: ${allUsers.length}`);
            console.log("Roles present:", [...new Set(allUsers.map(u => u.role))]);
        }

        process.exit();
    } catch (error) {
        console.error("DB Check Error:", error);
        process.exit(1);
    }
};

checkDB();
