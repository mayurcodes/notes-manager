const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConnection");
const userRoute = require("./routes/userRoute");
const notesRoute = require("./routes/notesRoute");
const { notFound, handleError } = require("./Middleware/errorMiddleware");
const path = require("path");

const app = express();
dotenv.config();
connectDB();

app.use(express.json());

const PORT = process.env.PORT || 6000;

app.use("/api/users", userRoute);
app.use("/api/notes", notesRoute);

//deployment
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.use(notFound);
app.use(handleError);

app.listen(PORT, console.log(`server is running on port ${PORT}`));
