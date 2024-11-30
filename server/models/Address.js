const mongoose = require("mongoose");
const AddressSchema = new mongoose.Schema(
  {
    userId: String,
    first: String,
    last: String,
    email: String,
    address: String,
    country: String,
    state: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
