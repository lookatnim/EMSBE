const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 10,
    match: /^[a-zA-Z]+$/,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 10,
    match: /^[a-zA-Z]+$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^(?:\+?94)?(?:\(0\))?\d{9}$/,
  },
  gender: {
    type: String,
    enum:['Male',"Female"],
    required: true,
  },
});

module.exports = mongoose.model("Employee", empSchema);
