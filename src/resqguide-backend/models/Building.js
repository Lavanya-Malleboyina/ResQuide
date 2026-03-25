const mongoose = require("mongoose");

const buildingSchema = new mongoose.Schema({

  name: String,
  location: String,
  floors: Number,
  type: String,

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

});

module.exports = mongoose.model("Building", buildingSchema);
