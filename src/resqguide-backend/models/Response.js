const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({

  building: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Building"
  },

  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question"
  },

  answer: String

});

module.exports = mongoose.model("Response", responseSchema);
