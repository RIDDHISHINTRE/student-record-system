const API = "/api/students";


// LOAD STUDENTS
async function loadStudents() {

    const response = await fetch(API);

    const students = await response.json();

    const studentList = document.getElementById("studentList");

    studentList.innerHTML = "";

    students.forEach(student => {

        studentList.innerHTML += `
        
        <div class="student-card">

            <h3>${student.name}</h3>

            <p>Roll: ${student.roll}</p>

            <p>Department: ${student.department}</p>

            <p>Year: ${student.year}</p>

            <button onclick="editStudent(
                '${student._id}',
                '${student.name}',
                '${student.roll}',
                '${student.department}',
                '${student.year}'
            )">
                Edit
            </button>

            <button onclick="deleteStudent('${student._id}')">
                Delete
            </button>

        </div>
        `;
    });
}


// ADD OR UPDATE
async function addOrUpdateStudent() {

    const id = document.getElementById("studentId").value;

    const student = {

        name: document.getElementById("name").value,

        roll: document.getElementById("roll").value,

        department: document.getElementById("department").value,

        year: document.getElementById("year").value
    };


    if (id) {

        // UPDATE

        await fetch(`${API}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)
        });

        document.getElementById("submitBtn").innerText = "Add Student";

    } else {

        // ADD

        await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)
        });
    }


    clearForm();

    loadStudents();
}


// EDIT
function editStudent(id, name, roll, department, year) {

    document.getElementById("studentId").value = id;

    document.getElementById("name").value = name;

    document.getElementById("roll").value = roll;

    document.getElementById("department").value = department;

    document.getElementById("year").value = year;

    document.getElementById("submitBtn").innerText = "Update Student";
}


// DELETE
async function deleteStudent(id) {

    await fetch(`${API}/${id}`, {

        method: "DELETE"
    });

    loadStudents();
}


// CLEAR FORM
function clearForm() {

    document.getElementById("studentId").value = "";

    document.getElementById("name").value = "";

    document.getElementById("roll").value = "";

    document.getElementById("department").value = "";

    document.getElementById("year").value = "";
}


loadStudents();