//USing .env file.
require("dotenv").config();
const portRoute = process.env.PORT;

//Importing routes.
const users_routes = require("./routes/user-routes");
const todos_routes = require("./routes/todo-routes");
const { verifyUser } = require("./middleware/auth");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/test") // mongodb://localhost:27017/demo will not work.
  .then(() => console.log("Connected to MongoDB."))
  .catch((err) => console.log(err));

const express = require("express");

//Creating an object.
const app = express();
app.use(express.json());

app.use("/users", users_routes);
app.use("/todos", verifyUser, todos_routes);

// Error handling middleware.
app.use((err, req, res, next) => {
  console.error(err);

  if (err.name == "ValidationError") res.status(400);
  else if (err.name == "CastError") res.status(400);

  res.json({ error: err.message });
});

//Unknown Path.
app.use((req, res) => {
  res.status(404).json({ error: "Path Not Found" });
});

app.listen(portRoute, () => {
  console.log(`Server is running in ${portRoute}.`);
});
