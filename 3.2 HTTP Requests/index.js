import express from "express";
import { fileURLToPath } from 'url';
import path from "path";
const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/about", (req, res) => {
  res.send(`
    <h1>About Me</h1>
    <p>My name is Vanesa</p>
    <a href='/contact'>Contact Me</a>
    <a href='/'>Home</a>
  `);
});

app.get("/contact", (req, res) => {
  res.send(`
    <h1>Contact Me</h1>
    <p>Phone: 123456789</p>
    <a href='/about'>About Me</a>
    <a href='/'>Home</a>
  `);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
