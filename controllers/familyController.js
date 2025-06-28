const Family = require("../models/Family");

// Create new family
exports.createFamily = async (req, res) => {
  try {
    const { familyName } = req.body;
    const existing = await Family.findOne({ familyName });
    if (existing) return res.status(400).json({ msg: "Family already exists" });

    const family = new Family({ familyName, members: [] });
    await family.save();
    res.status(201).json({ msg: "Family created", family });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get family by name (with full tree)
exports.getFamilyByName = async (req, res) => {
  try {
    const family = await Family.findOne({ familyName: req.params.familyName });
    if (!family) return res.status(404).json({ msg: "Family not found" });
    res.status(200).json(family);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Recursively add child to a member
function addChildRecursive(members, parentId, child) {
  for (let member of members) {
    if (member._id.toString() === parentId) {
      member.children.push(child);
      return true;
    }
    if (member.children && member.children.length > 0) {
      if (addChildRecursive(member.children, parentId, child)) {
        return true;
      }
    }
  }
  return false;
}

// Add member to family (under a parent)
exports.addMember = async (req, res) => {
  try {
    const { familyName, parentId } = req.params;
    const { name, dob, relation, image, docs } = req.body;

    const family = await Family.findOne({ familyName });
    if (!family) return res.status(404).json({ msg: "Family not found" });

    const newMember = {
      name,
      dob,
      relation,
      image,
      docs,
      children: []
    };

    if (parentId === "root") {
      family.members.push(newMember); // Add to root
    } else {
      const added = addChildRecursive(family.members, parentId, newMember);
      if (!added) return res.status(404).json({ msg: "Parent member not found" });
    }

    await family.save();
    res.status(201).json({ msg: "Member added", family });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
