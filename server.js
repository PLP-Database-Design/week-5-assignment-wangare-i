const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

app.use(express.json());
app.use(cors());
dotenv.config();

// Connection to DB
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Check if DB connection works
db.connect((err) => {
    if (err) return console.log("Error connecting to the DB");
    console.log("Connection successful", db.threadId);
});

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Question 1 goes here 
app.get('/data', (req, res) => {
    db.query('SELECT * FROM patients', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data');
        } else {
            res.render('data', { results: results });
        }
    });
});

app.get('/', (req, res) => {
    res.send('Server started successfully');
});

// question 2 goes here 
app.get('/providers', (req, res) => {
    db.query('SELECT * FROM providers', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data');
        } else {
            res.render('providers', { results: results });
        }
    });
});

app.get('/', (req, res) => {
    res.send('Server started successfully');
});
// Question 3 goes here 
app.get('/patientdata', (req, res) => {
    db.query('SELECT first_name FROM patients', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data');
        } else {
            res.render('providerdata', { results: results });
        }
    });
});

app.get('/', (req, res) => {
    res.send('Server started successfully');
});
// question 4 goes here 
app.get('/providerdata', (req, res) => {
    db.query('SELECT  provider_specialty FROM providers', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data');
        } else {
            res.render('providerdata', { results: results });
        }
    });
});

app.get('/', (req, res) => {
    res.send('Server started successfully');
});
// Listen to the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
