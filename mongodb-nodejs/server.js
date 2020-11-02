const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongodb = require('mongodb');
const dbname = "studentMentor";
const url = "mongodb://localhost:27017";

//configuring
const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());

//Api which displays all mentor objects
app.get('/mentors', async (req, res) => {
    let connection;
    try {
        connection = await mongodb.connect(url);
        let db = connection.db(dbname);
        let mentorData = await db.collection('mentors').find().toArray();
        await connection.close();
        res.json(mentorData);
    }
    catch (err) {
        if (connection) {
            await connection.close();
            console.log(err);
            res.status(500).json(err);
        }
    }
})

//Api which displays all student objects
app.get('/students', async (req, res) => {
    let connection;
    try {
        connection = await mongodb.connect(url);
        let db = connection.db(dbname);
        let studentsData = await db.collection('students').find().toArray();
        await connection.close();
        res.json(studentsData);
    }
    catch (err) {
        if (connection) {
            await connection.close();
            console.log(err);
            res.status(500).json(err);
        }
    }
})



//Adds new Mentor Data to mentors db
app.post('/addMentor', async (req, res) => {
    let connection;
    try {
        connection = await mongodb.connect(url);
        let db = connection.db(dbname);
        const mentorsCount = await db.collection("mentors").estimatedDocumentCount();
        req.body.id = mentorsCount + 1;
        let insertMentorData = await db.collection('mentors').insert(req.body);
        await connection.close();
        res.json(insertMentorData);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Assigns Mentor to Student
app.post('/assignStudent', async (req, res) => {
    let connection;
    try {
        connection = await mongodb.connect(url);
        let db = connection.db(dbname);
        const studentsCount = await db.collection("students").estimatedDocumentCount();
        req.body.id = studentsCount + 1;
        let insertStudentData = await db.collection('students').insert(req.body);
        await connection.close();
        res.json({ message: 'student assigned to mentor' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// Displays students for given mentor
app.get('/students/:mentorId', (req, res) => {
    let connection;
    try {
        connection = await mongodb.connect(url);
        let db = connection.db(dbname);
        let reqStudents = await db.collection('students').find({ mentorId: req.params.mentorId }).toArray();
        await connection.close();
        if (reqStudents.length > 0) {
            let studentsAssigned = reqStudents.map(stu => stu.name);
            res.write(studentsAssigned.join());
        }
        else {
            res.write('no students assigned or the mentor does not exist');
        }
    }
    catch (err) {
        if (connection) {
            await connection.close();
            console.log(err);
            res.status(500).json(err);
        }
    }

});

// updates mentor for a student
app.put('/updateMentor', async(req, res) => {
    try {
        connection = await mongodb.connect(url);
        let db = connection.db(dbname);
        let updateStudent = await db.collection('students').find({ mentorId: req.body.mentorId });
        if (updateStudent) {
            let newValue = {
                $set: { mentorName: req.body.name, mentorId: req.body.id, subject: req.body.subject }
            };
            await db.collection('students').update({ "_id": mongodb.ObjectID(req.params.id) }, newValue);
        }
        await connection.close();
        res.json({ message: 'student assigned to mentor' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// deletes student from db
app.delete('/deleteStudent', async(req, res) => {
    try {
        connection = await mongodb.connect(url);
        let db = connection.db(dbname);
        await db.collection('students').delete({ "_id": mongodb.ObjectID(req.params.id) });
        await connection.close();
        res.json({ message: 'Student Deleted' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})  

// Listens to port 3000
app.listen(3000, () => {
    console.log('Listening to port 3000');
})
