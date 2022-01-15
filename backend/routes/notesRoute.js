const express = require("express");
const {
  getAllNotes,
  addNote,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");
const { protect } = require("../Middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getAllNotes);
router.route("/create").post(protect, addNote);
router
  .route("/:id")
  .get(getNoteById)
  .put(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = router;
