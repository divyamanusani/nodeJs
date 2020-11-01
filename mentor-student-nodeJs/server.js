const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//configuring
const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());

let mentors = [
    {
        id: 1,
        name: 'rahul',
        subject: 'c++'
    }
]

let students = [
    {
        id: 501,
        name: 'pankaj',
        age: 13,
        mentorName: 'rahul',
        mentorId: 1,
        subject: 'c++'
    }
]

app.get('/mentors', (req, res) => {
    res.json(mentors);
})

app.get('/students', (req, res) => {
    res.json(students);
})

app.post('/addMentor', (req, res) => {
    req.body.id = mentors.length + 1;
    mentors.push(req.body);
    res.json({ message: 'mentor Added' });
})

app.post('/assignStudent', (req, res) => {
    req.body.id = 500 + students.length + 1;
    students.push(req.body);
    res.json({ message: 'student assigned to mentor' });
})

app.get('/students/:mentorId', (req, res) => {
    let reqMentor = mentors.find((mentor) => mentor.id == req.params.mentorId);
    if (reqMentor) {
        let reqStudents = students.filter((stu) => stu.mentorName === reqMentor.name);
        if (reqStudents.length == 0) {
            reqStudents = 'No student assigned to ' + reqMentor.name;
            res.json(reqStudents);
        }
        else {
            let mentorsStudents = reqStudents.map(stu => stu.name);
            res.json(`Students assigned to mentor ${reqMentor.name} : ${mentorsStudents.join()}`);
        }

    }

    else {
        res.json(`No mentor has id ${req.params.mentorId}`);
    }

});

app.put('/updateMentor', (req, res) => {
    let newMentorObj = mentors.find((mentor) => mentor.id == req.body.mentorId);
    if (newMentorObj) {
        students.forEach((student) => {
            if (student.id == req.body.studentId) {
                student.mentorName = newMentorObj.name;
                student.mentorId = newMentorObj.id;
                student.subject = newMentorObj.subject;
            }
        });
    }

    res.json({ message: 'mentor updated' });
})

app.delete('/deleteStudent', (req, res) => {
    let studentToDelete = students.find((student => student.id == req.body.stuId));
    let index = students.indexOf(studentToDelete);
    students.splice(index, 1);
    res.write('Student Deleted');
})

app.listen(3000, () => {
    console.log('Listening to port 3000');
})
