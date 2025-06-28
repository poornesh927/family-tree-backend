// models/FamilyMember.js
const mongoose = require('mongoose');

const familyMemberSchema = new mongoose.Schema({
  name: String,
  gender: String,
  relation: String, // e.g., father, mother, son
  image: String,
  aadhar: String,
  pan: String,
  voter: String,
  family: String,       // e.g., Mangapuram
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FamilyMember",
    default: null
  }
});

module.exports = mongoose.model("FamilyMember", familyMemberSchema);
