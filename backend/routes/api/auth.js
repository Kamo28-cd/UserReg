const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//User model
const User = require("../../models/User");

//User login request
router.post("/", (req, res) => {
  const { email, password } = req.body;

  //Validation simplified client side
  if (!email || !password)
    return res.status(400).json({ msg: "Please enter all fields" });
  //Checking for existing user
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    //Password validation
    bcryptjs.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: user.id },
        config.get("appsecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          return res.status(200).json({
            token,
            user: {
              id: user.id,
              idNumber: user.idNumber,
              name: user.name,
              surname: user.surname,
              email: user.email,
              account_number: user.account_number,
              registered_date: user.registered_date,
            },
          });
        }
      );
    });
  });
});

//logout user
router.post("/logout", (req, res, next) => {
  try {
    const { token, email } = req.body;
    if (!token) res.status(400).json({ msg: "Bad request" });
    //console.log(email)
    User.findOne({ email }).then((user) => {
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      jwt.sign(
        { id: user.id },
        config.get("appsecret"),
        { expiresIn: 1 },
        (err, token) => {
          if (err) throw err;
          return res.status(200).json({
            msg: "Logged out",
          });
        }
      );
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
