const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  edviron_id: Number,
  student_count: Number,
  address: {
    street: String,
    city: String,
    state: String,
    pin: String,
  },
  bank_details: {
    account_number: String,
    ifsc: String,
    account_holder: String,
  },
  date_of_establishment: Date,
  email_id: String,
  legal_details: {
    structure: String,
  },
  logo_url: String,
  name: String,
  phone_number: String,
  school_type: String,
  fee_collection_date: Number,
  late_fee: Number,
  late_fee_grace_period: Number,
  updatedAt: Date,
  convenience_fee: Number,
});

// Create a School model based on the schema
const School = mongoose.model("School", schoolSchema);

module.exports = School;
