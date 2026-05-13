import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    const today = new Date().getDay();
    const day = today > 0 && today < 6 ? "a weekday" : "the weekend";
    const text = today > 0 && today < 6 ? "work hard" : "relax";
    res.render("index.ejs", {day,text});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});