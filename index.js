const express = require("express");

const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/taskRoutes");
const connectDB = require("./db");
connectDB();
const app = express();
const PORT = 3000;

app.use(express.json());

// app.use("/", blogRoutes);
app.use("/", userRoutes);
app.use("/todos", todoRoutes);

app.listen(PORT, (error) => {
  if (!error) console.log("Listening on port " + PORT);
  else console.log("Error occurred, server can't start", error);
});
