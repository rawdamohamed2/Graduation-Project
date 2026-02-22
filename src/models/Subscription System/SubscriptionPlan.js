const mongoose = require("mongoose");

const subscriptionPlanSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    durationInMonths: Number,
    features: [String],
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("SubscriptionPlan", subscriptionPlanSchema);
