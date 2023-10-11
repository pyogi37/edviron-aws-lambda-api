const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  phone_number: String,
  school_id: { type: mongoose.Schema.Types.ObjectId, ref: "School" },
  class: String,
  section: String,
  category: String,
  dob: Date,
  gender: String,
  previous_session_dues: Number,
  additional_details: {
    aadhar: String,
    father: {
      name: String,
    },
    mother: {
      name: String,
    },
    address: {
      street: String,
      city: String,
      state: String,
      pin: String,
    },
  },
  aadhaar_number: String,
  address: {
    street: String,
    city: String,
    state: String,
    pin: String,
  },
  father_name: String,
  mother_name: String,
});

module.exports = mongoose.model("Student", studentSchema);
