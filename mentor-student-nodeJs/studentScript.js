let studentdata;

async function loadStudentData(isUpdate = false) {

    let dataraw = await fetch("http://localhost:3000/students");
    studentdata = await dataraw.json();
    let table = document.getElementById('studentTableBody');
    studentdata.forEach((stu) => {
        let tr = document.createElement('tr');
        let tdId = document.createElement('th');
        let tdAge = document.createElement('td');
        let tdname = document.createElement('td');
        let tdsubject = document.createElement('td');
        let tdmentorName = document.createElement('td');
        let tdUpdate = document.createElement('td');
        let tdDelete = document.createElement('td');
        tdUpdate.innerHTML = `<button onclick="updateMentor(${stu.id},'${stu.name}')" class="btn btn-warning">Update Mentor</button>`;
        tdDelete.innerHTML = `<button onclick="deleteStudent(${stu.id})" class="btn btn-danger">Delete Student</button>`;
        tdmentorName.innerHTML = stu.mentorName + '@' + stu.mentorId;
        tdId.innerHTML = stu.id;
        tdname.innerHTML = stu.name;
        tdsubject.innerHTML = stu.subject;
        tdAge.innerHTML = stu.age;
        tr.append(tdId, tdname, tdAge, tdsubject, tdmentorName, tdUpdate, tdDelete);
        table.appendChild(tr);
    })
}

async function updateMentor(stuId, stuName) {
    let confirmData = confirm('Are you sure you want to update mentor for student ' + stuName);
    if (confirmData) {
        let newMentorID = prompt('Enter the new mentorId to be assigned for student ' + stuName);

        await fetch('http://localhost:3000/updateMentor', {
            method: 'PUT',
            body: JSON.stringify({ mentorId: newMentorID, studentId: stuId }),
            headers: {
                'Content-type': 'application/json',
            }
        })

    }
    document.getElementById('studentTableBody').innerHTML = '';
    loadStudentData();
}

async function deleteStudent(studentId) {
    let confirmDelete = confirm('Are you sure you want to delete student?')
    if (confirmDelete) {
        await fetch('http://localhost:3000/deleteStudent', {
            method: 'DELETE',
            body: JSON.stringify({ stuId: studentId }),
            headers: {
                'Content-type': 'application/json',
            }
        })

        document.getElementById('studentTableBody').innerHTML = '';
        loadStudentData();
    }
}

window.onload = loadStudentData;