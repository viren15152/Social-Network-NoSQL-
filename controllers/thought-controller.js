const { Thought, User } = require("../models");

const thoughtController = {
  // Retrieve all thoughts
  getAllThoughts(req, res) {
    // Query all thoughts from the database
    Thought.find({})
      // Populate the reactions field for each thought
      .populate({
        path: "reactions",
        select: "-__v",
      })
      // Exclude the __v field from the response
      .select("-__v")
      // Sort the thoughts by ID in descending order
      .sort({ _id: -1 })
      // Handle successful retrieval of thoughts
      .then((dbThoughtData) => res.json(dbThoughtData))
      // Handle errors
      .catch((err) => {
        console.error(err);
        // Send a 400 Bad Request status in case of an error
        res.sendStatus(400);
      });
  },

  // Retrieve a single thought by its ID
  getThoughtById({ params }, res) {
    // Find a thought by its ID in the database
    Thought.findOne({ _id: params.id })
      // Populate the reactions field for the thought
      .populate({
        path: "reactions",
        select: "-__v",
      })
      // Exclude the __v field from the response
      .select("-__v")
      // Handle successful retrieval of the thought
      .then((dbThoughtData) => {
        // If no thought is found with the provided ID, return a 404 status
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        // Send the retrieved thought in the response
        res.json(dbThoughtData);
      })
      // Handle errors
      .catch((err) => {
        console.error(err);
        // Send a 400 Bad Request status in case of an error
        res.sendStatus(400);
      });
  },

  // Create a new thought
  createThought({ params, body }, res) {
    // Create a new thought based on the request body
    Thought.create(body)
      // Handle successful creation of the thought
      .then(({ _id }) => {
        // Add the created thought's ID to the associated user's thoughts array field
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      // Handle errors
      .then((dbUserData) => {
        // If no user is found with the provided ID, return a 404 status
        if (!dbUserData) {
          return res.status(404).json({ message: "Thought created but no user with this id!" });
        }
        // Send a success message in the response
        res.json({ message: "Thought successfully created!" });
      })
      // Handle errors
      .catch((err) => res.json(err));
  },

  // Update a thought by its ID
  updateThought({ params, body }, res) {
    // Find and update a thought by its ID with the provided data
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      // Handle successful update of the thought
      .then((dbThoughtData) => {
        // If no thought is found with the provided ID, return a 404 status
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        // Send the updated thought in the response
        res.json(dbThoughtData);
      })
      // Handle errors
      .catch((err) => res.json(err));
  },

  // Delete a thought by its ID
  deleteThought({ params }, res) {
    // Find and delete a thought by its ID
    Thought.findOneAndDelete({ _id: params.id })
      // Handle successful deletion of the thought
      .then((dbThoughtData) => {
        // If no thought is found with the provided ID, return a 404 status
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought with this id!" });
        }
        // Remove the thought ID from user's thoughts array field
        return User.findOneAndUpdate(
          { thoughts: params.id },
          { $pull: { thoughts: params.id } },
          { new: true }
        );
      })
      // Handle errors
      .then((dbUserData) => {
        // If no user is found with the provided ID, return a 404 status
        if (!dbUserData) {
          return res.status(404).json({ message: "Thought created but no user with this id!" });
        }
        // Send a success message in the response
        res.json({ message: "Thought successfully deleted!" });
      })
      // Handle errors
      .catch((err) => res.json(err));
  },

  // Add a reaction to a thought
  addReaction({ params, body }, res) {
    // Find and update a thought by its ID to add the reaction
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
      // Handle successful addition of the reaction
      .then((dbThoughtData) => {
        // If no thought is found with the provided ID, return a 404 status
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought with this id" });
          return;
        }
        // Send the updated thought in the response
        res.json(dbThoughtData);
      })
      // Handle errors
      .catch((err) => res.json(err));
  },

  // Remove a reaction from a thought
  removeReaction({ params }, res) {
    // Find and update a thought by its ID to remove the reaction
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      // Handle successful removal of the reaction
      .then((dbThoughtData) => res.json(dbThoughtData))
      // Handle errors
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
