const studentTable = document.getElementById('studentTable').querySelector('tbody');
const addStudentForm = document.getElementById('addStudentForm');
const searchInput = document.getElementById('searchInput');
const addStudentModal = document.getElementById('addStudentModal');
const editStudentModal = document.getElementById('editStudentModal');
const addStudentBtn = document.getElementById('addStudentBtn');
const editStudentBtn = document.getElementById('editStudentBtn');

const students = []; // Array to store student data

addStudentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const studentId = document.getElementById('studentId').value;
    const studentName = document.getElementById('studentName').value;
    const studentAge = document.getElementById('studentAge').value;
    const studentGrade = document.getElementById('studentGrade').value;

    const newStudent = {
        id: studentId,
        name: studentName,
        age: studentAge,
        grade: studentGrade
    };

    students.push(newStudent);
    updateTable();
    clearForm();
    addStudentModal.style.display = 'none';
});

searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const rows = studentTable.querySelectorAll('tr');

    rows.forEach((row) => {
        const studentName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        if (studentName.includes(searchTerm)) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    });
});

studentTable.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const row = event.target.parentNode.parentNode;
        const studentId = row.querySelector('td:nth-child(1)').textContent;

        // Remove student from array
        students.splice(students.findIndex(student => student.id === studentId), 1);
        updateTable();
    }

    if (event.target.classList.contains('edit-btn')) {
        const row = event.target.parentNode.parentNode;
        const studentId = row.querySelector('td:nth-child(1)').textContent;
        const studentName = row.querySelector('td:nth-child(2)').textContent;
        const studentAge = row.querySelector('td:nth-child(3)').textContent;
        const studentGrade = row.querySelector('td:nth-child(4)').textContent;

        // Populate edit modal form
        document.getElementById('editStudentId').value = studentId;
        document.getElementById('editStudentName').value = studentName;
        document.getElementById('editStudentAge').value = studentAge;
        document.getElementById('editStudentGrade').value = studentGrade;

        // Show edit modal
        editStudentModal.style.display = 'block';
    }
});

editStudentBtn.addEventListener('click', () => {
    const editedStudentId = document.getElementById('editStudentId').value;
    const editedStudentName = document.getElementById('editStudentName').value;
    const editedStudentAge = document.getElementById('editStudentAge').value;
    const editedStudentGrade = document.getElementById('editStudentGrade').value;

    // Update student data in array
    students.forEach(student => {
        if (student.id === editedStudentId) {
            student.name = editedStudentName;
            student.age = editedStudentAge;
            student.grade = editedStudentGrade;
        }
    });

    updateTable();
    editStudentModal.style.display = 'none';
});

function updateTable() {
    studentTable.innerHTML = '';
    students.forEach(student => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.grade}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        studentTable.appendChild(newRow);
    });
}

function clearForm() {
    document.getElementById('studentId').value = '';
    document.getElementById('studentName').value = '';
    document.getElementById('studentAge').value = '';
    document.getElementById('studentGrade').value = '';
}
