
const express = require("express");
const giftRoutes = require("./giftRoutes");
const searchRoutes = require("./searchRoutes");

const app = express();

app.use(express.json());

// Gift routes: /api/gifts and /api/gifts/:id
app.use(giftRoutes);

// Search route: /api/search
app.use(searchRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to GiftLink API"
  });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
