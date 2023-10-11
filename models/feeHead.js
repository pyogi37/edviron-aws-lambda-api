const mongoose = require("mongoose");

const feeHeadSchema = new mongoose.Schema({
  frequency_months: Number,
  amount: Number,
  name: String,
  class: [String],
  start_date: Date,
  tax: Number,
  category: [String],
  gender: [String],
  school_id: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
});

module.exports = mongoose.model("FeeHead", feeHeadSchema);
