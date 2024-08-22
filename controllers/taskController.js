const { validationResult } = require("express-validator");
const Todo = require("../schema/todoSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createTodo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, description } = req.body;
    let newTodo = new Todo({
      title,
      description,
    });
    const todo = await newTodo.save();
    const token = jwt.sign({ taskId: todo._id }, "task", {
      expiresIn: "1h",
    });
    res.status(200).json({
      _id: todo._id,
      title: todo.title,
      description: todo.description,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Some error occurred" });
  }
};
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Authentication failed" });
      }
      const token = jwt.sign({ userId: user._id }, "task", {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } else {
      res.status(404).send({ message: "User doesn't exist!" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Some error occurred" });
  }
};

module.exports = {
  createTodo,
};
