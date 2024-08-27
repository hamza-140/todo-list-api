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

router.get("/", verifyToken, todoController.getTodos);

router.put(
  "/:id",
  [
    body("title", "Title cannot be null").exists(),
    body("description", "Description cannot be null").exists(),
  ],
  verifyToken,
  todoController.updateTodo
);
router.delete("/:id", verifyToken, todoController.deleteTodo);

module.exports = router;
