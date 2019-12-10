const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const SELECT_ALL_FROM_USERS = "SELECT * FROM users";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "reactht"
});

connection.connect(err => {
  if (err) {
    console.log("Not connected \n" + err);
    return err;
  } else {
    console.log("Connected");
  }
});

const app = express();

app.use(cors());

app.get("/users", (req, res) => {
  connection.query(SELECT_ALL_FROM_USERS, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

app.get("/", (req, res) => {
  res.send("Haloo");
});

app.get("/signup", (req, res) => {
  const { username, password } = req.query;
  const INSERT_NEW_USER = `INSERT INTO users(username, password) VALUES('${username}', '${password}')`;

  connection.query(INSERT_NEW_USER, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("Signed up");
    }
  });
});

app.listen(4000),
  () => {
    console.log("Server listening on port 4000");
  };
