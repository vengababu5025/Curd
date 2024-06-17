const mysql = require("mysql2");
const express = require('express');
const port = 3001;
const app = express();
const body_parser = require('body-parser');
require('dotenv').config();
app.use(body_parser.json());
const cors = require('cors');
app.use(cors());
app.use(express.json());

const db_con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Venga@0715',
    database:'sample',
});
db_con.connect((err) => {
    if (err) {
        console.log("Database Connection Failed !!!", err);
        return;
    }
    console.log("We are connected to student database");
});

app.get('/', (req, res) => {
    let sql = "select * from student";
    db_con.query(sql, (err, rows) => {
        if (err) return res.json(err);
        return res.json({ students: rows });
    });
});

app.post('/student', (req, res) => {
    const sql = "INSERT INTO STUDENT (`Name`, `Email`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email
    ];
    db_con.query(sql, [values], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.get('/read/:id', (req, res) => {
    let sql = "select * from student where id=?";
    const id = req.params.id;
    db_con.query(sql, [id], (err, rows) => {
        if (err) return res.json(err);
        return res.json({ stud: rows });
    });
});

app.put('/update/:id', (req, res) => {
    const { Name, Email } = req.body;
    const sql = "UPDATE student SET Name = ?, Email = ? WHERE id = ?";
    const id = req.params.id;
    db_con.query(sql, [Name, Email, id], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});
app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM student WHERE id = ?";
    const id = req.params.id;
    db_con.query(sql, [id], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM sadmin WHERE admin=? AND password=?";
    const values = [
        req.body.username,
        req.body.password
    ];
    
    db_con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        
        console.log("Query result:", result);
        if (result.length > 0) {
            // User authenticated successfully
            return res.json({ success: true, user: result[0] });
        } else {
            // Authentication failed
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    });
});



app.listen(port, () => {
    console.log("app is running");
});
