const mongoose = require("mongoose");

const duesSchema = new mongoose.Schema(
  {
    fee_head: { type: mongoose.Schema.Types.ObjectId, ref: "FeeHead" },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    due_date: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dues", duesSchema);
