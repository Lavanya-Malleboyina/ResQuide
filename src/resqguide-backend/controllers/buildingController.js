const Building = require("../models/Building");

exports.createBuilding = async (req, res) => {
  try {
    const building = await Building.create({
      ...req.body,
      createdBy: req.user._id
    });
    res.status(201).json(building);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBuildings = async (req, res) => {
  try {
    const buildings = await Building.find({ createdBy: req.user._id });
    res.json(buildings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBuildingById = async (req, res) => {
  try {
    const building = await Building.findById(req.params.id);
    if (!building) {
      return res.status(404).json({ message: "Building not found" });
    }
    res.json(building);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateBuilding = async (req, res) => {
  try {
    const building = await Building.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!building) {
      return res.status(404).json({ message: "Building not found" });
    }
    res.json(building);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteBuilding = async (req, res) => {
  try {
    const building = await Building.findByIdAndDelete(req.params.id);
    if (!building) {
      return res.status(404).json({ message: "Building not found" });
    }
    res.json({ message: "Building deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
