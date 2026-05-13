import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "1234",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT country_code FROM visited_countries");
    const countries = result.rows.map(country => country.country_code);
    res.render("index.ejs", { countries: countries, total: countries.length });
  } catch (err) {
    console.log("Database error:", err.message);
    res.redirect("/");
  }
});

app.post("/add", async (req, res) => {
  const rawInput = req.body["country"];

  if (!rawInput || rawInput.trim() === "") {
    console.log("Empty or invalid input.");
    return res.redirect("/");
  }
  
  const input = rawInput.trim();

  try {
    const codeResult = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%' OR LOWER(country_code) = LOWER($1)", 
      [input]
    );

    if (codeResult.rows.length === 0) {
      console.log("Country not found in the database.");
      return res.redirect("/");
    }

    const countryCode = codeResult.rows[0].country_code;

    const result = await db.query(
      "INSERT INTO visited_countries (country_code) VALUES ($1) RETURNING *",
      [countryCode]
    );
    
    console.log("Inserted country:", result.rows[0]);
    res.redirect("/");

  } catch (err) {
    console.log("Database error:", err.message);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});