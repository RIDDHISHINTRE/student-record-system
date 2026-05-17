const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const Student = require("./models/Student");

const app = express();

app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// Serve Frontend Files
app.use(express.static(path.join(__dirname, "../frontend")));


// ADD STUDENT
app.post("/students", async (req, res) => {

    try {

        const student = new Student(req.body);

        await student.save();

        res.json(student);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


// GET ALL STUDENTS
app.get("/students", async (req, res) => {

    try {

        const students = await Student.find();

        res.json(students);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


// UPDATE STUDENT
app.put("/students/:id", async (req, res) => {

    try {

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedStudent);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


// DELETE STUDENT
app.delete("/students/:id", async (req, res) => {

    try {

        await Student.findByIdAndDelete(req.params.id);

        res.json({
            message: "Student Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});


// HOME PAGE
app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "../frontend/index.html")
    );

});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});