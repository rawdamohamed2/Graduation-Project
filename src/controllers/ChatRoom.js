const ChatRoom = require("../models/Communication/ChatRoom");

exports.addChatRoom = async (req, res) => {
    try {

        const room = await ChatRoom.create(req.body);

        res.status(201).json(room);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};