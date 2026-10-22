const express = require("express");
const giftRoutes = require("./giftRoutes");
const searchRoutes = require("./searchRoutes");

const app = express();

app.use(express.json());

// Gift routes
app.use(giftRoutes);

// Search routes
app.use(searchRoutes);

// GiftLink landing page
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>GiftLink - Share the Joy</title>
      <style>
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          text-align: center;
        }
        .container {
          padding: 40px;
        }
        h1 {
          font-size: 52px;
          margin-bottom: 20px;
        }
        p {
          font-size: 20px;
          margin-bottom: 30px;
        }
        button {
          background: white;
          color: #764ba2;
          border: none;
          padding: 15px 35px;
          font-size: 18px;
          border-radius: 10px;
          cursor: pointer;
        }
        button:hover {
          background: #eeeeff;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to GiftLink</h1>
        <p>Find, share, and discover the perfect gifts for your loved ones.</p>
        <button type="button">Get Started</button>
      </div>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
