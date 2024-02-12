// Import the Express router module
const router = require("express").Router();

// Import the API routes from a separate file
const apiRoutes = require("./api");

// Define a route handler for requests starting with "/api"
// Delegates handling to the imported API routes
router.use("/api", apiRoutes);

// Define a catch-all route handler for any other requests
router.use((req, res) => {
  // Send a 404 error response
  res.status(404).send("<h1> 404 Error!</h1>");
});

// Export the router module, making it available for use in other parts of the application
module.exports = router;
