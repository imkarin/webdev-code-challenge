const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

let users = {};
console.log(user);

app.use(bodyParser.json());
app.use(express.static(__dirname));

document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    alert(result.message);
  });

app.get("/register", async (req, res) => {
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
