const { Router } = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/userController");
const router = Router();

router.post(
  "/register",
  [
    body("name", "Name cannot be null").exists(),
    body("email", "Email cannot be null").exists(),
    body("password", "Password cannot be null").exists(),
  ],
  userController.registerUser
);
router.post(
  "/login",
  [
    body("email", "Email cannot be null").exists(),
    body("password", "Password cannot be null").exists(),
  ],
  userController.loginUser
);

module.exports = router;
