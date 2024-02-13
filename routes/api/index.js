// Import the Express router module
const router = require("express").Router();

// Import user routes from a separate file
const userRoutes = require("./user-routes");

// Import thought routes from a separate file
const thoughtRoutes = require("./thought-routes");

// Define route handlers for requests starting with "/users" and "/thoughts"
// Delegates handling to the imported userRoutes and thoughtRoutes
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

// Export the router module, making it available for use in other parts of the application
module.exports = router;
