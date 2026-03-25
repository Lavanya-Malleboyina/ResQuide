const mongoose = require("mongoose");

const safePlaceSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    location: String
  },
  {
    collection: "safeplaces"
  }
);

module.exports = mongoose.model("SafePlace", safePlaceSchema);
