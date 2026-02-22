const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        unique: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    amount: Number,

    paymentMethod: {
        type: String,
        enum: ["card", "instapay", "cash", "wallet", "apple_pay"]
    },

    status: {
        type: String,
        enum: [
            "pending",
            "pending_verification",
            "paid",
            "failed",
            "refunded"
        ],
        default: "pending"
    },

    transactionId: String,

    paymentProofImage: String,

    approvedByAdmin: {
        type: Boolean,
        default: false
    },

    releasedToWorker: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
