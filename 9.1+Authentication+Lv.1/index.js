import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "1234",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!password || !username) {
    res.send("Please provide both email and password.");
    return;
  }
  
  try {
    await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
      username,
      password,
    ]);
    res.redirect("/");
  } catch (err) {
    res.send("Email already in use.");
  }

  
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const result = await db.query("SELECT * FROM users WHERE email = $1 AND password = $2", [
    username,
    password,
  ]);

  if (result.rows.length > 0) {
    res.render("secrets.ejs");
  } else {
    res.send("Invalid credentials. Please try again.");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
