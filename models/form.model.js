const mongoose = require("mongoose");

var formSchema = new mongoose.Schema({
  uid: {
    // _id of user
    type: mongoose.SchemaTypes.ObjectId,
    required: "User id cannot be empty",
  },
  name: {
    type: String,
    required: "name cannot be empty",
  },
  email: {
    type: String,
    required: "email cannot be empty",
  },
  mobile: {
    type: String,
    required: "mobile cannot be empty",
  },
  createdOn: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now(),
  },
  applicationAmount: {
    type: String,
    required: "application amount cannot be empty",
  },
  profileImg: {
    type: String,
    required: "profileImg cannot be empty",
  },
});

module.exports = mongoose.model("Form", formSchema, "Form");
