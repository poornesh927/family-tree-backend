const Family = require("../models/Family");

function addChildRecursive(members, parentId, child) {
  for (let member of members) {
    if (member._id.toString() === parentId) {
      member.children.push(child);
      return true;
    }
    if (member.children?.length > 0) {
      if (addChildRecursive(member.children, parentId, child)) return true;
    }
  }
  return false;
}

exports.uploadFilesAndAddMember = async (req, res) => {
  try {
    const { familyName, parentId } = req.params;
    const { name, dob, relation } = req.body;
    const files = req.files;

    const family = await Family.findOne({ familyName });
    if (!family) return res.status(404).json({ msg: "Family not found" });

    const newMember = {
      name,
      dob,
      relation,
      image: files.image ? `/uploads/${files.image[0].filename}` : "",
      docs: {
        aadhar: files.aadhar ? `/uploads/${files.aadhar[0].filename}` : "",
        pan: files.pan ? `/uploads/${files.pan[0].filename}` : "",
        voter: files.voter ? `/uploads/${files.voter[0].filename}` : ""
      },
      children: []
    };

    if (parentId === "root") {
      family.members.push(newMember);
    } else {
      const added = addChildRecursive(family.members, parentId, newMember);
      if (!added) return res.status(404).json({ msg: "Parent not found" });
    }

    await family.save();
    res.status(201).json({ msg: "Member added with uploaded files", family });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
