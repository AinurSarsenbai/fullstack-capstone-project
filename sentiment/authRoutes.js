
const express = require("express");
const bcrypt = require("bcryptjs");
const { connectToDatabase } = require("./db");

const router = express.Router();

// Register a new user
router.post("/api/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "Username and password are required"
      });
    }

    const db = await connectToDatabase();
    const users = db.collection("users");

    const existingUser = await users.findOne({ username });

    if (existingUser) {
      return res.status(409).json({
        error: "User already exists"
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await users.insertOne({
      username,
      passwordHash
    });

    res.status(201).json({
      message: "Registration successful"
    });
  } catch (error) {
    res.status(500).json({
      error: "Registration failed"
    });
  }
});

// Log in an existing user
router.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "Username and password are required"
      });
    }

    const db = await connectToDatabase();
    const users = db.collection("users");

    const user = await users.findOne({ username });

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials"
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!validPassword) {
      return res.status(401).json({
        error: "Invalid credentials"
      });
    }

    res.json({
      message: "Login successful",
      username: user.username
    });
  } catch (error) {
    res.status(500).json({
      error: "Login failed"
    });
  }
});

module.exports = router;
