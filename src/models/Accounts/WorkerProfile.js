const mongoose = require("mongoose");

const workerProfileSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    bio: String,
    // category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Category",
    //     required: true
    // },
    categories: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }
    ],
    //
    // skills: [String],

    experienceYears: {
        type: Number,
        default: 0
    },

    nationalIdFront: {
        type: String,
        required: true
    },

    nationalIdBack: {
        type: String,
        required: true
    },

    isApproved: {
        type: Boolean,
        default: false
    },

    approvalStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },

    vehicleType: String,   // لو نقل عفش

    licenseImage: String,  // لو محتاج رخصة

    // ratingAverage: {
    //     type: Number,
    //     default: 0
    // },

    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },

    isAvailable: { type: Boolean, default: false },

    availability: [
        { day: String, from: String, to: String }
    ],

    lastLocationUpdate: Date

    // availabilityStatus: {
    //     type: String,
    //     enum: ["online", "offline", "busy"],
    //     default: "offline"
    // }

}, { timestamps: true });

module.exports = mongoose.model("WorkerProfile", workerProfileSchema);