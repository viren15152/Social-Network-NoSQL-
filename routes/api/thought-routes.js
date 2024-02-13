// Import the Express router module
const router = require("express").Router();

// Import the thought controller methods from the controller file
const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

// Define routes for handling various thought-related operations

// Route: /api/thoughts
// Method: GET (Retrieve all thoughts), POST (Create a new thought)
router.route("/")
  .get(getAllThought)  // Handle GET requests to retrieve all thoughts
  .post(createThought); // Handle POST requests to create a new thought

// Route: /api/thoughts/:id
// Method: GET (Retrieve a single thought by ID), PUT (Update a thought by ID), DELETE (Delete a thought by ID)
router.route("/:id")
  .get(getThoughtById)  // Handle GET requests to retrieve a single thought by ID
  .put(updateThought)   // Handle PUT requests to update a thought by ID
  .delete(deleteThought); // Handle DELETE requests to delete a thought by ID

// Route: /api/thoughts/:thoughtId/reactions
// Method: POST (Add a reaction to a thought)
router.route("/:thoughtId/reactions")
  .post(addReaction); // Handle POST requests to add a reaction to a thought

// Route: /api/thoughts/:thoughtId/reactions/:reactionId
// Method: DELETE (Remove a reaction from a thought by its ID)
router.route("/:thoughtId/reactions/:reactionId")
  .delete(removeReaction); // Handle DELETE requests to remove a reaction from a thought by its ID

// Export the router module, making it available for use in other parts of the application
module.exports = router;
