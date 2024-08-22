const { Router } = require("express");
const { body } = require("express-validator");
const todoController = require("../controllers/taskController");
const verifyToken = require("../middleware/authMiddleware");

const router = Router();

router.post(
  "/",
  [
    body("title", "Title cannot be null").exists(),
    body("description", "Description cannot be null").exists(),
  ],
  verifyToken,
  todoController.createTodo
);

module.exports = router;
