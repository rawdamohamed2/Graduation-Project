const mongoose = require("mongoose");

const bookingAssignmentSchema = new mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true
    },

    worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    status: {
        type: String,
        enum: ["sent","accepted","rejected"],
        default: "sent"
    },

    assignedAt: {
        type: Date,
        default: Date.now
    }
});

bookingAssignmentSchema.index({ worker: 1 });
bookingAssignmentSchema.index({ booking: 1 });

module.exports = mongoose.model("BookingAssignment", bookingAssignmentSchema);
