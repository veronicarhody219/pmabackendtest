const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;
let userSchema = new Schema({
  //   firstName: {type: String, required: true},
  //   lastName: {type: String, required: true},
  email: {type: String, require: true, unique: true},
  password: {type: String, require: true},
  date: {type: Date, default: Date.now},
});
// userSchema.statics.signup = async function (email, password) {
//   if (!email || !password) {
//     throw Error("All fields must be filled");
//   }
//   if (!validator.isEmail(email)) {
//     throw Error("Email is not valid");
//   }
//   if (!validator.isStrongPassword(password)) {
//     throw Error(
//       "&bull; The password length must be greater than or equal to 8The password must contain one or more uppercase characters \n &bull; The password must contain one or more lowercase characters \n &bull; The password must contain one or more numeric values \n &bull; The password must contain one or more special characters"
//     );
//   }
//   const exists = await this.findOne({email});
//   if (exists) {
//     throw Error("Email already exists");
//   }
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(password, salt);
//   const user = await this.create({email, password: hash});
//   return user;
// };
// userSchema.statics.login = async function (email, password) {
//   if (!email || !password) {
//     throw Error("All fields must be filled");
//   }
//   const user = await this.findOne({email});
//   if (!user) {
//     throw Error("Incorrect email");
//   }
//   const match = await bcrypt.compare(password, user.password);
//   if (!match) {
//     throw Error("Incorrect password");
//   }
//   return user;
// };

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};
module.exports = mongoose.model("User", userSchema);
