const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({

  questionText: {
    type: String,
    required: true
  },

  buildingType: {
    type: String,
    required: true
  },

  options: {
    type: [String],
    default: []
  },

  weight: {
    type: Number,
    default: 1
  },

  dependsOn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    default: null
  }

});

module.exports = mongoose.model("Question", questionSchema);
