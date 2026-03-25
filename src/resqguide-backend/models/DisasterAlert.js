const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({

  disasterType: String,

  location: String,

  message: String,

  severity: String,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("DisasterAlert", alertSchema);
