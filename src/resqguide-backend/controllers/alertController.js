const DisasterAlert = require("../models/DisasterAlert");

exports.createAlert = async (req, res) => {
  try {
    const alert = await DisasterAlert.create(req.body);
    res.status(201).json(alert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAlerts = async (req, res) => {
  try {
    const alerts = await DisasterAlert.find().sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAlertById = async (req, res) => {
  try {
    const alert = await DisasterAlert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ message: "Alert not found" });
    }
    res.json(alert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteAlert = async (req, res) => {
  try {
    const alert = await DisasterAlert.findByIdAndDelete(req.params.id);
    if (!alert) {
      return res.status(404).json({ message: "Alert not found" });
    }
    res.json({ message: "Alert deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
