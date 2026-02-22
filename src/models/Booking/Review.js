const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
        required: true
    },

    comment: {
        type: String,
        default: ""
    }

}, { timestamps: true });


reviewSchema.index({ worker: 1 });
reviewSchema.index({ booking: 1 });

module.exports = mongoose.model("Review", reviewSchema);
