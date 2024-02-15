const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  dob: { type: String },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("User", userSchema);
