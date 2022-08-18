const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  categoryIds: Array,
  type: {
    type: String,
  },
  subjectIds: Array,
  type: {
    type: String,
  },
  title: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("chapeterss", chapterSchema);
