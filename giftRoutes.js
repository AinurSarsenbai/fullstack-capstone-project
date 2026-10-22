
const express = require("express");
const { ObjectId } = require("mongodb");
const { connectToDatabase } = require("./db");

const router = express.Router();

// GET /api/gifts - List all gifts
router.get("/api/gifts", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const gifts = await db.collection("gifts").find({}).toArray();
    res.json(gifts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch gifts" });
  }
});

// GET /api/gifts/:id - Get one gift
router.get("/api/gifts/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid gift ID" });
    }

    const gift = await db.collection("gifts").findOne({
      _id: new ObjectId(req.params.id)
    });

    if (!gift) {
      return res.status(404).json({ error: "Gift not found" });
    }

    res.json(gift);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch gift" });
  }
});

module.exports = router;
