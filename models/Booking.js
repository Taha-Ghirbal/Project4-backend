const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    carName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cars",
      required: true,
    },

    bookingDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  {timestamps: true,}
);

module.exports = mongoose.model("Booking", bookingSchema);