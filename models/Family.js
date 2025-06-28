const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  name: String,
  dob: String,
  relation: String,
  image: String,
  docs: {
    aadhaar: String,
    pan: String,
    voter: String
  },
  children: [this] // recursive children
});

const FamilySchema = new mongoose.Schema({
  familyName: { type: String, required: true },
  members: [MemberSchema]
});

module.exports = mongoose.model("Family", FamilySchema);
