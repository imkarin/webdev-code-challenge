const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

let users = {};
console.log(user);

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (user[username]) {
    // ERROR MESSAGE
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users[username] = hashedPassword;
  res.json({ message: "Registration Succesful" });
  console.log(hashedPassword);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = users[username];

  console.log(hashedPassword);

  if (!hashePassword) {
    // ERROR MESSAGE
  }

  const matchingUser = await bcrypt.compare(password, hashedPassword);
  if (isMatch) {
    // SUCCESS MESSAGE
  }
});

app.listen(port);
