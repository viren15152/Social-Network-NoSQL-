// Import the Express router module
const router = require("express").Router();

// Import the user controller methods from the controller file
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

// Define routes for handling various user-related operations

// Route: /api/users
// Method: GET (Retrieve all users), POST (Create a new user)
router.route("/")
  .get(getAllUser)   // Handle GET requests to retrieve all users
  .post(createUser); // Handle POST requests to create a new user

// Route: /api/users/:id
// Method: GET (Retrieve a single user by ID), PUT (Update a user by ID), DELETE (Delete a user by ID)
router.route("/:id")
  .get(getUserById)  // Handle GET requests to retrieve a single user by ID
  .put(updateUser)   // Handle PUT requests to update a user by ID
  .delete(deleteUser); // Handle DELETE requests to delete a user by ID

// Route: /api/users/:userId/friends/:friendId
// Method: POST (Add a friend to a user's friend list), DELETE (Remove a friend from a user's friend list)
router.route("/:userId/friends/:friendId")
  .post(addFriend)   // Handle POST requests to add a friend to a user's friend list
  .delete(removeFriend); // Handle DELETE requests to remove a friend from a user's friend list

// Export the router module, making it available for use in other parts of the application
module.exports = router;
