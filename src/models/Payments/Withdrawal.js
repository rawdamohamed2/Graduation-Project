const mongoose = require("mongoose");

const withdrawalSchema = new mongoose.Schema({

    worker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    wallet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallet"
    },

    amount: {
        type: Number,
        required: true
    },

    method: {
        type: String,
        enum: ["bank", "instapay", "vodafone_cash"]
    },

    accountDetails: {
        type: String
    },

    status: {
        type: String,
        enum: ["pending", "approved", "rejected", "paid"],
        default: "pending"
    },

    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true });

module.exports = mongoose.model("Withdrawal", withdrawalSchema);