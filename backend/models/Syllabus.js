const mongoose = require("mongoose");

const syllabusSchema = new mongoose.Schema({
    subjectName: { type: String, required: true },
    subjectCode: { type: String, required: true },
    semester: { type: String, required: true },
    department: { type: String, default: "Computer Science" },
    syllabusContent: { type: String }, // Can be a URL or text
    mappedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Syllabus", syllabusSchema);
