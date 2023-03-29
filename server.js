// Server-side implementation using Node.js and Express

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

const users = [];

app.post("/api/signup", (req, res) => {
  const { name, email, password, userType } = req.body;

  // Check if user already exists with the same email address
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Validate email format
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  // Check password length
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  // Create new user object and add to users array
  const newUser = { name, email, password, userType };
  users.push(newUser);

  return res.status(201).json({ message: "User created successfully" });
