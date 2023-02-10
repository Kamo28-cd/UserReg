const express = require("express");
const router = express.Router();

//bring in User Model
const User = require("../../models/User");

//post request for registration
router.post("/", (req, res) => {
  const { email, receiver_account } = req.body;
  let receiverAccount = +receiver_account;

  if (!email) {
    return res
      .status(400)
      .json({ msg: "Internal error, please refresh and try again" });
  }

  // Check if user exists
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    //Check if receiver exists
    User.findOne({ account_number: receiverAccount }).then((receiver) => {
      if (!receiver) {
        return res.status(400).json({
          msg: "Transaction Failed, Please enter the correct account number",
        });
      }

      res.status(200).json({
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
    });
  });
});

module.exports = router;
