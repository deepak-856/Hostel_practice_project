const mongoose = require("mongoose");

const MessOffSchema = new mongoose.Schema({
  studentId: String,
  startDate: Date,
  endDate: Date,
  reason: String,
  status: { type: String, enum: ["Pending", "Approved", "Rejected"] },
});

module.exports = mongoose.model("MessOff", MessOffSchema);
