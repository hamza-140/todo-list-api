const { validationResult } = require("express-validator");
const Todo = require("../schema/todoSchema");
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
      creator: req.userId,
    });
    const todo = await newTodo.save();
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
const updateTodo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    const task = await Todo.findOne({ _id: id });
    if (task) {
      if (task.creator == req.userId) {
        const updatedTask = await Todo.findOneAndUpdate(
          { id },
          {
            $set: {
              title,
              description,
            },
          },
          { new: true }
        );
        res.status(200).json({
          _id: updatedTask._id,
          title: updatedTask.title,
          description: updatedTask.description,
        });
      } else {
        res.status(403).send({ message: "forbidden" });
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Some error occurred" });
  }
};

module.exports = {
  createTodo,
  updateTodo,
};
