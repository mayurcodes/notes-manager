const notesModel = require("../model/notesModel");
const asyncHandler = require("express-async-handler");

const addNote = asyncHandler(async (req, res) => {
  const newNote = ({ title, content, category } = req.body);

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please fill all the fields");
  } else {
    const note = new notesModel({
      userId: req.user.id,
      title,
      content,
      category,
    });
    const createdNote = await note.save();
    res.status(201).json(createdNote);
  }
});

module.exports = { addNote };
