// Importing the necessary functions from the thought-controller module
const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

// Defining routes for fetching, updating, and deleting a thought by its ID
router
  .route("/:id")
  .get(getThoughtById)    // Route to get a thought by its ID
  .put(updateThought)     // Route to update a thought by its ID
  .delete(deleteThought); // Route to delete a thought by its ID

// Route for removing a reaction from a thought
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

// Route for adding a reaction to a thought
router.route("/:thoughtId/reactions").post(addReaction);

// Route for fetching all thoughts and creating a new thought
router.route("/").get(getAllThoughts).post(createThought);

// Exporting the router for use in other modules
module.exports = router;

