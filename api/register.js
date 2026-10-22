
const crypto = require("crypto");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const { username, email, password } = req.body || {};

  if (!username || !email || !password) {
    return res.status(400).json({
      error: "All fields are required"
    });
  }

  const user = {
    id: crypto.randomUUID(),
    username,
    email
  };

  return res.status(201).json({
    message: "User registered successfully",
    user
  });
};
