// Import required modules
const express = require("express");
const db = require("./config/connection"); // Database connection
const routes = require("./routes"); // API routes

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001; // Port configuration

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount API routes
app.use(routes);

// Database connection event listener
db.once("open", () => {
  // Start server and listen on specified port
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
