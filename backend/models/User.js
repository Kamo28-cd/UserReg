const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create a Schema

const UserSchema = new Schema({
  idNumber: { type: Number, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  account_number: { type: Number, required: true },
  registered_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("user", UserSchema);
