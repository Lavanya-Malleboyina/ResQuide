const BuildingType = require("../models/BuildingType");

exports.createBuildingType = async (req, res) => {
  try {
    const buildingType = await BuildingType.create(req.body);
    res.status(201).json(buildingType);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBuildingTypes = async (req, res) => {
  try {
    const buildingTypes = await BuildingType.find();
    res.json(buildingTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteBuildingType = async (req, res) => {
  try {
    const buildingType = await BuildingType.findByIdAndDelete(req.params.id);
    if (!buildingType) {
      return res.status(404).json({ message: "Building type not found" });
    }
    res.json({ message: "Building type deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
