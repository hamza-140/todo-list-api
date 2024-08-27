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
    const task = await Todo.findById(id);
    if (task) {
      if (task.creator == req.userId) {
        const updatedTask = await Todo.findByIdAndUpdate(
          id,
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
const deleteTodo = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const id = req.params.id;
    const task = await Todo.findById(id);
    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    } else {
      if (task.creator == req.userId) {
        await Todo.findByIdAndDelete(id);
        res.status(204).send({ message: "Deleted Successfully!" });
      } else {
        res.status(403).send({ message: "forbidden" });
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Some error occurred" });
  }
};

const getTodos = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const { title, description } = req.query;

  // Sorting criteria
  const sortField = req.query.sortBy || "createdAt";
  const sortOrder = req.query.order === "desc" ? -1 : 1;

  try {
    let filter = { creator: req.userId };
    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }
    if (description) {
      filter.description = { $regex: description, $options: "i" };
    }

    const total = await Todo.countDocuments(filter);
    const todos = await Todo.find(filter)
      .sort({ [sortField]: sortOrder })
      .skip((page - 1) * limit)
      .limit(limit)
      .select("title description createdAt");

    res.status(200).json({
      data: todos,
      page,
      limit,
      total,
      sortOrder,
      sortField,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Some error occurred" });
  }
};

module.exports = {
  getTodos,
};

module.exports = {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodos,
};
