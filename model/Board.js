const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let boardSchema = new Schema(
  {
    title: {type: String, required: true},
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },

  {timestamps: true}
);
module.exports = mongoose.model("Board", boardSchema);
