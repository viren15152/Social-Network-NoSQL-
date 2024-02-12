// Import necessary modules from Mongoose
const { Schema, model } = require("mongoose");

// Define User schema
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true, // Ensures usernames are unique
      trim: true,
      required: "Username is Required", // Error message if username is not provided
    },

    email: {
      type: String,
      unique: true, // Ensures emails are unique
      required: "Username is Required", // Error message if email is not provided
      match: [/.+@.+\..+/], // Validates email format
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId, // Reference to Thought model's ObjectId
        ref: "Thought", // Refers to the Thought model
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId, // Reference to User model's ObjectId (self-reference)
        ref: "User", // Refers to the User model (self-reference)
      },
    ],
  },
  {
    toJSON: {
      virtuals: true, // Include virtual properties when converting document to JSON
    },
    id: false, // Disable default "_id" field
  }
);

// Define virtual property "friendCount" to compute the number of friends for each user
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create User model based on UserSchema
const User = model("User", UserSchema);

module.exports = User; // Export User model
