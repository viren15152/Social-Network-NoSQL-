// Import necessary modules from Mongoose
const { Schema, model, Types } = require("mongoose");

// Import dateFormat utility function to format timestamps
const dateFormat = require("../utils/dateFormat");

// Define Reaction schema
const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId, // Mongoose's ObjectId data type
      default: () => new Types.ObjectId(), // Default value is set to a new ObjectId
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Set default value to the current timestamp
      get: (timestamp) => dateFormat(timestamp), // Use a getter method to format the timestamp on query
    },
  },
  {
    toJSON: {
      getters: true, // Include getters when converting document to JSON
    },
    id: false, // Disable default "_id" field
  }
);

// Define Thought schema
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: "Thought is Required",
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema], // Array of nested documents created with the ReactionSchema
  },
  {
    toJSON: {
      virtuals: true, // Include virtual properties when converting document to JSON
      getters: true,
    },
    id: false,
  }
);

// Define virtual property "reactionCount" to compute the number of reactions for each thought
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Create Thought model based on ThoughtSchema
const Thought = model("Thought", ThoughtSchema);

module.exports = Thought; // Export Thought model
