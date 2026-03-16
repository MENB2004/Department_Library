const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        username: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },

        email: {
            type: String,
        },

        department: {
            type: String,
            default: "Computer Science",
            required: true,
        },

        batch: {
            type: String,
        },

        semester: {
            type: String,
        },
        registerNo: {
            type: String,
        },

        isAdvisor: {
            type: Boolean,
            default: false,
        },

        advisoryClass: {
            type: String,
        },

        advisorySemester: {
            type: String,
        },

        role: {
            type: String,
            enum: ["admin", "advisor", "student", "faculty", "hod"],
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);