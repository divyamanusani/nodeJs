let mentorData;

//Adds mentor to database
async function addMentor() {
    let mentorData = {
        name: document.getElementById('name').value,
        subject: document.getElementById('sub').value
    }
    await fetch('http://localhost:3000/addMentor', {
        method: 'POST',
        body: JSON.stringify(mentorData),
        headers: {
            'Content-type': 'application/json'
        }
    })

    loadMentorData(false);
}

// updates mentor table 
async function loadMentorData(isFirst = true) {
    let dataraw = await fetch("http://localhost:3000/mentors");
    mentordata = await dataraw.json();
    let table = document.getElementById('mentorTableBody');
    if (isFirst)
        var lastMentor = mentordata[0];
    else
        var lastMentor = mentordata[mentordata.length - 1];
    let tr = document.createElement('tr');
    let tdId = document.createElement('td');
    let tdname = document.createElement('td');
    let tdsubject = document.createElement('td');
    let addstudent = document.createElement('td');

    tdId.innerHTML = lastMentor.id;
    tdname.innerHTML = lastMentor.name;
    tdsubject.innerHTML = lastMentor.subject;
    addstudent.innerHTML = `<button onclick="displayStudentForm('${lastMentor.id}')" class="btn btn-success")>Assign Student</button>`

    tr.append(tdId, tdname, tdsubject, addstudent);
    table.append(tr);

}

// displys student form
async function displayStudentForm(mentorId) {
    document.getElementById('studentForm').style.display = 'block';
    let reqMentor = mentordata.find((mentor) => mentor.id == mentorId);
    console.log(reqMentor);
    document.getElementById('mentorName').value = `${reqMentor.id},${reqMentor.name},${reqMentor.subject}`;
    document.getElementById("mentorName").disabled = true;
}

//adds student to student database
async function addStudent() {
    let mentorDetails = document.getElementById('mentorName').value.split(',');
    let studentData = {
        name: document.getElementById('stuname').value,
        age: document.getElementById('age').value,
        mentorId: mentorDetails[0],
        mentorName: mentorDetails[1],
        subject: mentorDetails[2],
    }
    await fetch('http://localhost:3000/assignStudent', {
        method: 'POST',
        body: JSON.stringify(studentData),
        headers: {
            'content-Type': "application/json"
        }
    });
    document.querySelector('#studentForm').style.display = 'none';
}

// function calls on opening window
window.onload = loadMentorData;