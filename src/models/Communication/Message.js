const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    chatRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatRoom",
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    senderType: {
        type: String,
        enum: ["user", "worker", "bot", "admin"],
        required: true
    },
    message: { type: String, required: true },
    messageType: { type: String, enum: ["text","image"], default: "text" },
    isRead: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);

