const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors());

app.use(express.json());


// Serve Frontend Files
app.use(express.static(path.join(__dirname, '../frontend')));


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)

.then(() => {
    console.log('Connected to MongoDB Atlas');
})

.catch(err => {
    console.error('MongoDB connection error:', err);
});


// Models
const Student = require('./models/Student');


// ======================
// API ROUTES
// ======================


// GET ALL STUDENTS
app.get('/api/students', async (req, res) => {

    try {

        const students = await Student.find();

        res.json(students);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
});


// GET SINGLE STUDENT
app.get('/api/students/:id', async (req, res) => {

    try {

        const student = await Student.findById(req.params.id);

        if (!student) {

            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.json(student);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
});


// ADD STUDENT
app.post('/api/students', async (req, res) => {

    const student = new Student({

        name: req.body.name,

        roll: req.body.roll,

        department: req.body.department,

        year: req.body.year
    });

    try {

        const newStudent = await student.save();

        res.status(201).json(newStudent);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });
    }
});


// UPDATE STUDENT
app.put('/api/students/:id', async (req, res) => {

    try {

        const student = await Student.findById(req.params.id);

        if (!student) {

            return res.status(404).json({
                message: 'Student not found'
            });
        }


        if (req.body.name)
            student.name = req.body.name;

        if (req.body.roll)
            student.roll = req.body.roll;

        if (req.body.department)
            student.department = req.body.department;

        if (req.body.year)
            student.year = req.body.year;


        const updatedStudent = await student.save();

        res.json(updatedStudent);

    } catch (err) {

        res.status(400).json({
            message: err.message
        });
    }
});


// DELETE STUDENT
app.delete('/api/students/:id', async (req, res) => {

    try {

        const student = await Student.findById(req.params.id);

        if (!student) {

            return res.status(404).json({
                message: 'Student not found'
            });
        }

        await student.deleteOne();

        res.json({
            message: 'Student deleted'
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
});


// HOME ROUTE
app.get('/', (req, res) => {

    res.sendFile(
        path.join(__dirname, '../frontend/index.html')
    );
});


// START SERVER
app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);

});