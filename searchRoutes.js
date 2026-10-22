
const express = require("express");
const { connectToDatabase } = require("./db");

const router = express.Router();

// GET /api/search?category=Electronics
router.get("/api/search", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { category } = req.query;

    const filter = {};

    if (category) {
      filter.category = {
        $regex: category,
        $options: "i"
      };
    }

    const items = await db.collection("gifts")
      .find(filter)
      .toArray();

    res.json(items);
  } catch (error) {
    res.status(500).json({
      error: "Failed to search items"
    });
  }
});

module.exports = router;
