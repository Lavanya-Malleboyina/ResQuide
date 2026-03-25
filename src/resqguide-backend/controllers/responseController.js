const Response = require("../models/Response");

exports.submitResponse = async (req, res) => {
  try {
    const response = await Response.create(req.body);
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getResponses = async (req, res) => {
  try {
    const responses = await Response.find({
      building: req.params.buildingId
    }).populate("question");
    res.json(responses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
