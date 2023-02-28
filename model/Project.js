const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let projectSchema = new Schema(
  {
    group: {type: String, required: true, unique: true},
    pname: {type: String, required: true},
    desc: {type: String, required: true},
    tasks: {type: Array},
  },
  {timestamps: true}
);
module.exports = mongoose.model("Project", projectSchema);
