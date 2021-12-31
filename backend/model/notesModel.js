const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required,
  },
  content: {
    type: String,
    required,
  },
  category: {
    type: String,
    required,
  },
});

const notes = mongoose.model("note", noteSchema);
module.exports = notes;
