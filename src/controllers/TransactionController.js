const Transaction = require("../models/Wallet/WalletTransaction");

exports.addTransaction = async (req, res) => {
    try {

        const transaction = await Transaction.create(req.body);

        res.status(201).json(transaction);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};