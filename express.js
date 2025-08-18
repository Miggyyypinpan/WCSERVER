import express from 'express';
import multer from 'multer';

//File Path Stuff
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

// Storage object, tells multer where to put the file and what name to give it
var storage = multer.diskStorage({
    // You can create a callback function to pass data back to the parent after a function if needed
    // In this case we pass the data back up to multer via the callback()
    destination: (req, file, callback ) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

// Changed .single() (Expect only a single field), to .fields()
// Where you need to specify input is the upload. In this case the "name" of the <input> in your html
var upload = multer({storage: storage}).fields([{ name: 'file', maxCount: 1}]);;

// Open form on index (/)
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, '/uploadForm.html'));
    });

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        // Check if successful
        if (err) return res.status(400).send('Error uploading file');
        
        const uploadedFile = req.files['file'][0];
        var response = {
            adminId: req.body.adminId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            department: req.body.department,
            uploadedFile: uploadedFile.path
        }

        console.log("Response is: ", response);
        res.end(`Received Data: ${JSON.stringify(response)}`)
    })
});


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
app.post('/postAdmin', (req,res) =>{
    upload(req, res, (err) =>{
        if (err) return res.status(400).send('Error uploading file');
        
        const uploadedFile = req.files['file'][0];
        var response = {
            adminId: req.body.adminId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            department: req.body.department,
            uploadedFile: uploadedFile.path
        }

        console.log("Response is: ", response);
        res.end(`Received Data: ${JSON.stringify(response)}`)
    })
});

// Listen to port
var server = app.listen(5001, () =>{
    const host = server.address().address;
    const port = server.address().port;

    console.log(`Server running at http://%s:%s/`, host, port);
});
