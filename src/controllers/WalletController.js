const Wallet = require("../models/Wallet/Wallet");

exports.addWallet = async (req, res) => {
    try {

        const wallet = await Wallet.create(req.body);

        res.status(201).json(wallet);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};