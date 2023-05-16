const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  desc: {
    type: String,
    required: true,
    minLength: 10,
  },
  complete: {
    type: Boolean,
    required: true,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});
todoSchema.set("toJSON", {
  transform: (document, returnDocument) => {
    returnDocument.id = document._id.toString();
    delete returnDocument._id;
    delete returnDocument.__v;
  },
});

module.exports = new mongoose.model("Todo", todoSchema);
