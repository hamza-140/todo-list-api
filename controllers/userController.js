const { validationResult } = require("express-validator");
const User = require("../schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, email, password } = req.body;
    let existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      res.send({ message: "User already exists!" });
    } else {
      const hash = await bcrypt.hash(password, 10);
      let newUser = new User({
        name,
        email,
        password: hash,
      });
      const user = await newUser.save();
      const token = jwt.sign({ userId: user._id }, "task", {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    }
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
  registerUser,
  loginUser,
};
