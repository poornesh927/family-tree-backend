// Dummy data for testing
exports.getAllUsers = (req, res) => {
  res.status(200).json([
    { id: 1, name: "Poornesh" },
    { id: 2, name: "Sample Admin" }
  ]);
};
