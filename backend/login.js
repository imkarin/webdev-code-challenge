const express = require("express");
const bcrypt = require("bcryptjs");

let users = {};

const app = express();
const port = 3000;

app.get("/", (req, res) => res.render(index));

app.listen(port);
