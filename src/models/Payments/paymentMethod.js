const mongoose = require("mongoose");

const paymentMethodSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    type: {
        type: String,
        enum: ["card", "instapay"]
    },

    provider: String, // Visa / Mastercard

    last4Digits: String,

    token: String, // من Payment Gateway

    instapayNumber: String,

    isDefault: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model("PaymentMethod", paymentMethodSchema);