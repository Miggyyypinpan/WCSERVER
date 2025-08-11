import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

const __dirname = import.meta.dirname;
const app = express();

//Middleware to parse JSON and URL-encoded data
const urlEncoderParser = bodyParser.urlencoded({extended: false});


app.use(express.static('public'));

// Routes
app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/pages/home.html')
});

app.get('/userPage', (req, res) =>{
    res.sendFile(__dirname + '/pages/user.html')
});

app.get('/studentForm', (req, res) =>{
    res.sendFile(__dirname + '/pages/student.html')
});

app.get('/adminForm', (req, res) =>{
    res.sendFile(__dirname + '/pages/admin.html')
});

app.get('/user', (req,res) =>{
    const userId = req.query.id;
    const userName = req.query.name;
    if (userId && userName){
        req.send(`<html><body><h1>User ${userName}'s ID is : ${userId}</h1></body></html>`);
    }else res.status(400).send(`User ID and name is required`);
});


// Get Func
app.get('/getUser', (req,res) =>{
    var response = {
        firstName: req.query.firstName,
        lastName: req.query.lastName,
    }

    console.log("Response is: ", response);
    res.end(`Received Data ${JSON.stringify(response)}`)
});

// Handles the Student Form submission
app.get('/getStudent', (req,res) =>{
    var response = {
        studentId: req.query.studentId,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        section: req.query.section
    }

    console.log("Response is: ", response);
    res.end(`Received Data ${JSON.stringify(response)}`)
});

// Handles the Admin Form submission
app.post('/postAdmin', urlEncoderParser, (req,res) =>{
    var response = {
        adminId: req.body.adminId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        department: req.body.department
    }

    console.log("Response is: ", response);
    res.end(JSON.stringify(response));
});

// Start the server
const server = app.listen(5000, () =>{
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server running at http://${host}:${port}`);
})