const SafePlace = require("../models/SafePlace");

exports.createSafePlace = async (req, res) => {
  try {
    const place = await SafePlace.create(req.body);
    res.status(201).json(place);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSafePlaces = async (req, res) => {
  try {
    const places = await SafePlace.find();
    res.json(places);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSafePlaceById = async (req, res) => {
  try {
    const place = await SafePlace.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ message: "Safe place not found" });
    }
    res.json(place);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteSafePlace = async (req, res) => {
  try {
    const place = await SafePlace.findByIdAndDelete(req.params.id);
    if (!place) {
      return res.status(404).json({ message: "Safe place not found" });
    }
    res.json({ message: "Safe place deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
