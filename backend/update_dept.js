const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const updateDept = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const result = await User.updateMany(
            { department: "CSE" },
            { $set: { department: "Computer Science" } }
        );
        console.log(`Updated ${result.modifiedCount} users from 'CSE' to 'Computer Science'.`);

        process.exit();
    } catch (error) {
        console.error("Update Error:", error);
        process.exit(1);
    }
};

updateDept();
