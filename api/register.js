
const crypto = require("crypto");
const { connectToDatabase } = require("../db");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { username, email, password } = req.body || {};

    if (!username || !email || !password) {
      return res.status(400).json({
        error: "All fields are required"
      });
    }

    const db = await connectToDatabase();
    const users = db.collection("users");

    const existing = await users.findOne({ email });

    if (existing) {
      return res.status(409).json({
        error: "User already exists"
      });
    }

    const passwordSalt = crypto.randomBytes(16).toString("hex");
    const passwordHash = crypto
      .scryptSync(password, passwordSalt, 64)
      .toString("hex");

    const result = await users.insertOne({
      username,
      email,
      passwordSalt,
      passwordHash,
      createdAt: new Date()
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: result.insertedId,
        username,
        email
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal server error"
    });
  }
};
