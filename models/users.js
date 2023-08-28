
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    require:true
  },
});

const collection = mongoose.model("collection", userSchema);

module.exports = collection;
