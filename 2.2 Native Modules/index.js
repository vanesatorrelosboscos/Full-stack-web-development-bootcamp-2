const fs = require("fs");

fs.writeFile("hello.txt", "Hello, Node.js!", (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});

fs.readFile("hello.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log("File content:", data);
});