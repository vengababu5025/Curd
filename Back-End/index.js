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
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
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

app.get('/login',(req,res)=>{
	const sql="select * from student where admin='admin' AND password='Venga@5025'";
	const values = [
        req.body.username,
        req.body.password
    ];
	db_con.query(sql,(err,result)=>{
		if (err) return res.json(err);
		console.log(result)
        return res.json(result);

	})
})


app.listen(port, () => {
    console.log("app is running");
});
