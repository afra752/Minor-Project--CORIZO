// ======== ELEMENTS ========
const form = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const idInput = document.getElementById("studentId");
const ageInput = document.getElementById("age");
const emailInput = document.getElementById("email");
const tableBody = document.querySelector("#studentTable tbody");
const submitBtn = document.getElementById("submitBtn");

// ======== STATE ========
let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null;

// ======== DISPLAY STUDENTS ========
function renderTable() {
  tableBody.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.age}</td>
      <td>${student.email}</td>
      <td class="actions">
        <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  localStorage.setItem("students", JSON.stringify(students));
}

// ======== ADD / UPDATE STUDENT ========
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const student = {
    name: nameInput.value.trim(),
    id: idInput.value.trim(),
    age: ageInput.value.trim(),
    email: emailInput.value.trim(),
  };

  if (editIndex === null) {
    students.push(student);
  } else {
    students[editIndex] = student;
    editIndex = null;
    submitBtn.textContent = "Add Student";
  }

  localStorage.setItem("students", JSON.stringify(students));
  renderTable();
  form.reset();
});

// ======== EDIT STUDENT ========
function editStudent(index) {
  const student = students[index];
  nameInput.value = student.name;
  idInput.value = student.id;
  ageInput.value = student.age;
  emailInput.value = student.email;

  editIndex = index;
  submitBtn.textContent = "Update Student";
}

// ======== DELETE STUDENT ========
function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderTable();
  }
}

// ======== INITIAL LOAD ========
renderTable();
