const mongoose = require("mongoose");
const { Schema } = mongoose;

const Todo = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("tasks", Todo, "tasks");
