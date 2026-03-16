const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("MongoDB Connected");

        const result = await User.deleteOne({ username: "admin" });

        if (result.deletedCount > 0) {
            console.log("Admin deleted successfully");
        } else {
            console.log("Admin not found");
        }

        process.exit();
    })
    .catch((err) => {
        console.error("Error:", err);
        process.exit(1);
    });