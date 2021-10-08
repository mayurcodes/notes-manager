const express = require("express");
const dotenv = require("dotenv");
const notesData = require("./data/notes");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 6000;

app.get("/", (req, res) => {
  res.send(`api is running....`);
});

app.get("/api/notes", (req, res) => {
  res.json(notesData);
});

app.get("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;
  const note = notesData.find((n) => {
    return n.id === noteId;
  });
  res.send(note);
});

app.listen(PORT, console.log(`server is running on port ${PORT}`));
