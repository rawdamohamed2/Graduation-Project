const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        sparse: true
    },

    phone: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["user", "worker", "admin", "moderator", "owner"],
        default: "user"
    },

    profileImage: String,

    isVerified: {
        type: Boolean,
        default: false
    },

    isBlocked: {
        type: Boolean,
        default: false
    },

    wallet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wallet"
    },

    enabledLocation: { type: Boolean, default: false },

    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
            validate: {
                validator: function (value) {
                    // لو enabledLocation = true لازم coordinates حقيقية
                    if (this.enabledLocation) {
                        return Array.isArray(value) &&
                            value.length === 2 &&
                            value[0] !== 0 &&
                            value[1] !== 0;
                    }
                    return true;
                },
                message: "Location coordinates required when enabledLocation is true"
            }
        }
    },

    lastLogin: Date

}, { timestamps: true });

userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("User", userSchema);