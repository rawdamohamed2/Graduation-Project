const mongoose = require("mongoose");

const aiMatchLogSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    recommendedWorkers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    algorithmScore: Number,
    selectedWorker: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    decisionAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AiMatchLog", aiMatchLogSchema);
