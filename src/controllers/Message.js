const Message = require("../models/Communication/Message");

exports.addMessage = async (req, res) => {
    try {

        const msg = await Message.create(req.body);

        res.status(201).json(msg);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};