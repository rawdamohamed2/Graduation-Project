const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    basePrice: { type: Number, default: 0, min: 0 },
    estimatedTime: Number,
    isActive: { type: Boolean, default: true },
    priceOptions: [
        {
            optionName: String,
            optionType: String,
            values: [Number],
            pricePerUnit: Number
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);

