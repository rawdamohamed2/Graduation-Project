const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ],
    type: {
        type: String,
        enum: ["user_worker", "user_bot", "admin_user", "admin_worker"],
        required: true
    },
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: function() { return this.type === "user_worker"; }
    },
    lastMessage: String
}, { timestamps: true });

module.exports = mongoose.model("ChatRoom", chatRoomSchema);
