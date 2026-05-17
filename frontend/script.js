const API = "api/students";


// LOAD STUDENTS
async function loadStudents() {

    const response = await fetch(API);
    const students = await response.json();

    const studentList = document.getElementById("studentList");
    studentList.innerHTML = "";

    students.forEach(student => {

        const card = document.createElement("div");
        card.className = "student-card";

        card.innerHTML = `
            <h3>${student.name}</h3>
            <p>Roll: ${student.roll}</p>
            <p>Department: ${student.department}</p>
            <p>Year: ${student.year}</p>

            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        `;

        // EDIT BUTTON
        card.querySelector(".editBtn").addEventListener("click", () => {
            editStudent(student);
        });

        // DELETE BUTTON
        card.querySelector(".deleteBtn").addEventListener("click", () => {
            deleteStudent(student._id);
        });

        studentList.appendChild(card);
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


// EDIT (FIXED - NO ALERT, NO INLINE BUG)
function editStudent(student) {

    document.getElementById("studentId").value = student._id;
    document.getElementById("name").value = student.name;
    document.getElementById("roll").value = student.roll;
    document.getElementById("department").value = student.department;
    document.getElementById("year").value = student.year;

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


// INIT
loadStudents();