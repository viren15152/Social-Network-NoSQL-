const { User, Thought } = require("../models");

const userController = {
  // Create a new user
  createUser({ body }, res) {
    // Create a new user based on the request body
    User.create(body)
      // Handle successful creation of the user
      .then((dbUserData) => res.json(dbUserData))
      // Handle errors
      .catch((err) => res.json(err));
  },

  // Retrieve all users
  getAllUser(req, res) {
    // Query all users from the database
    User.find({})
      // Populate the friends field for each user
      .populate({
        path: "friends",
        select: "-__v",
      })
      // Exclude the __v field from the response
      .select("-__v")
      // Sort the users by ID in descending order
      .sort({ _id: -1 })
      // Handle successful retrieval of users
      .then((dbUserData) => res.json(dbUserData))
      // Handle errors
      .catch((err) => {
        console.error(err);
        // Send a 400 Bad Request status in case of an error
        res.sendStatus(400);
      });
  },

  // Retrieve a single user by their ID
  getUserById({ params }, res) {
    // Find a user by their ID in the database
    User.findOne({ _id: params.id })
      // Populate the thoughts and friends fields for the user
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      // Exclude the __v field from the response
      .select("-__v")
      // Handle successful retrieval of the user
      .then((dbUserData) => {
        // If no user is found with the provided ID, return a 404 status
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "No user found with this id!" });
        }
        // Send the retrieved user in the response
        res.json(dbUserData);
      })
      // Handle errors
      .catch((err) => {
        console.error(err);
        // Send a 400 Bad Request status in case of an error
        res.sendStatus(400);
      });
  },

  // Update a user by their ID
  updateUser({ params, body }, res) {
    // Find and update a user by their ID with the provided data
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      // Handle successful update of the user
      .then((dbUserData) => {
        // If no user is found with the provided ID, return a 404 status
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        // Send the updated user in the response
        res.json(dbUserData);
      })
      // Handle errors
      .catch((err) => res.json(err));
  },

  // Delete a user by their ID
  deleteUser({ params }, res) {
    // Find and delete a user by their ID
    User.findOneAndDelete({ _id: params.id })
      // Handle successful deletion of the user
      .then((dbUserData) => {
        // If no user is found with the provided ID, return a 404 status
        if (!dbUserData) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        // BONUS: Delete all thoughts associated with the deleted user
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => {
        // Send a success message in the response
        res.json({ message: "User and associated thoughts deleted!" });
      })
      // Handle errors
      .catch((err) => res.json(err));
  },

  // Add a friend to a user
  addFriend({ params }, res) {
    // Find and update a user by their ID to add the friend
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      // Handle successful addition of the friend
      .then((dbUserData) => {
        // If no user is found with the provided ID, return a 404 status
        if (!dbUserData) {
          res.status(404).json({ message: "No user with this id" });
          return;
        }
        // Send the updated user in the response
        res.json(dbUserData);
      })
      // Handle errors
      .catch((err) => res.json(err));
  },

  // Remove a friend from a user
  removeFriend({ params }, res) {
    // Find and update a user by their ID to remove the friend
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      // Handle successful removal of the friend
      .then((dbUserData) => {
        // If no user is found with the provided ID, return a 404 status
        if (!dbUserData) {
          return res.status(404).json({ message: "No user with this id!" });
        }
        // Send the updated user in the response
        res.json(dbUserData);
      })
      // Handle errors
      .catch((err) => res.json(err));
  },
};

module.exports = userController;