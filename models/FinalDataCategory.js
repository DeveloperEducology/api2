const mongoose = require("mongoose");

const FinalSchema = new mongoose.Schema({
  categoryIds: Array,
  type: {
    type: String,
  },
  title: { type: String },
  affordability: { type: String },
  complexity: { type: String },
  imageUrl: { type: String },
  duration: { type: String },
  url: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FinalData", FinalSchema);
