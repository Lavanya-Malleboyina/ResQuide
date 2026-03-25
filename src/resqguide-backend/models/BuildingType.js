const mongoose = require("mongoose");

const buildingTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("BuildingType", buildingTypeSchema);
