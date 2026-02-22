const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true
    },

    worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    status: {
        type: String,
        enum: ["pending","accepted","completed","cancelled"],
        default: "pending"
    },

    price: {
        type: Number,
        default: 0
    },

    scheduledDate: {
        type: Date,
        required: true
    },

    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },

    notes: String

}, { timestamps: true });


bookingSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Booking", bookingSchema);