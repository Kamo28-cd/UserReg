const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//bring in User Model
const User = require("../../models/User");

// Utils
const { getRandom } = require("../../helpers/utils");
//register user
//post request for registration
router.post("/", (req, res) => {
  const { name, surname, email, idNumber, password } = req.body;

  if (!name || !surname || !email || !idNumber || !password) {
    return res
      .status(400)
      .json({ msg: "Please enter your name/email/password/id" });
  }

  // Check if user exists
  User.findOne({ email }).then((user) => {
    if (user)
      return res
        .status(400)
        .json({ msg: "User already exists, email already in use" });

    const newUser = new User({
      idNumber,
      name,
      surname,
      email,
      account_number: getRandom(11),
      password,
    });

    //Hashing password,Create salt using bcryptjs
    bcryptjs.genSalt(10, (err, salt) => {
      bcryptjs.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;

        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            config.get("appsecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({
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
  });
});

module.exports = router;
