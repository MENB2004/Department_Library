const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI);

async function createUser() {
    const hashedPassword = await bcrypt.hash("1234", 10);

    const user = new User({
        username: "advisor",
        password: hashedPassword,
        role: "advisor",
    });

    await user.save();
    console.log("Advisor user created");
    process.exit();
}

createUser();