const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  categoryIds: Array,
  type: {
    type: String,
  },
  title: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("subjectss", subjectSchema);
