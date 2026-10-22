
const { connectToDatabase } = require("../db");
const crypto = require("crypto");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const db = await connectToDatabase();
    const user = await db.collection("users").findOne({ email });

    if (!user || !user.passwordHash || !user.passwordSalt) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const hash = crypto.scryptSync(password, user.passwordSalt, 64);
    const savedHash = Buffer.from(user.passwordHash, "hex");

    if (
      hash.length !== savedHash.length ||
      !crypto.timingSafeEqual(hash, savedHash)
    ) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: { id: user._id, email: user.email, username: user.username }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
