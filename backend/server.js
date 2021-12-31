const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConnection");
const userRoute = require("./routes/userRoute");
const { notFound, handleError } = require("./Middleware/errorMiddleware");
const notesData = require("./data/notes");

const app = express();
dotenv.config();
connectDB();

app.use(express.json());

const PORT = process.env.PORT || 6000;

// Add Access Control Allow Origin headers to avoid cors policy error
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*"); // * to allow all the sites we can give url too
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

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

app.use("/api/users", userRoute);
app.use(notFound);
app.use(handleError);

app.listen(PORT, console.log(`server is running on port ${PORT}`));
