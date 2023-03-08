const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let boardSchema = new Schema(
  {
    title: {type: String, required: true},
  },

  {timestamps: true}
);
module.exports = mongoose.model("Board", boardSchema);
