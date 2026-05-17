const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    roll: String,
    department: String,
    year: String
});

module.exports = mongoose.model("Student", studentSchema);