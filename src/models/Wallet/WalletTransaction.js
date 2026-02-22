const mongoose = require("mongoose");

const walletTransactionSchema = new mongoose.Schema({

    wallet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallet",
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    type: {
        type: String,
        enum: ["credit", "debit"],
        required: true
    },

    source: {
        type: String,
        enum: [
            "booking_payment",
            "wallet_topup",
            "withdrawal",
            "refund",
            "admin_adjustment"
        ]
    },

    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "completed"
    },

    referenceId: {
        type: mongoose.Schema.Types.ObjectId
    },

    note: String

}, { timestamps: true });

module.exports = mongoose.model("WalletTransaction", walletTransactionSchema);