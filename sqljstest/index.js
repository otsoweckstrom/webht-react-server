const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const SELECT_ALL_FROM_USERS = "SELECT * FROM users";
const SELECT_ALL_FROM_POSTS = "SELECT * FROM posts";
const SELECT_FROM_POSTS_WHERE = "SELECT * FROM posts WHERE id_post = ";

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
app.get("/posts", (req, res) => {
  connection.query(SELECT_ALL_FROM_POSTS, (err, results) => {
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
app.get("/createpost", (req, res) => {
  const { username, post_title, post_content } = req.query;
  const INSERT_NEW_POST = `INSERT INTO posts(username, post_title, post_content) VALUES('${username}', '${post_title}', '${post_content}')`;

  connection.query(INSERT_NEW_POST, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("Post Created");
    }
  });
});

app.listen(4000),
  () => {
    console.log("Server listening on port 4000");
  };
