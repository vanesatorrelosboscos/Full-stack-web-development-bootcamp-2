import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  const length = req.body.fName.length + req.body.lName.length;
  const message = `There ${length === 1 ? ' is' : ' are'} ${length} character${length === 1 ? '' : 's'} in your name.`;
  res.render("index.ejs", { message });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
