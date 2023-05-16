const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 5,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["viewOnly", "write"],
    default: "viewOnly",
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedDocument) => {
    returnedDocument.id = document._id.toString();
    delete returnedDocument._id;
    delete returnedDocument.password;
    delete returnedDocument.__v;
  },
});

module.exports = new mongoose.model("User", userSchema);
