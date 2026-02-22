const Withdrawal = require("../models/Payments/Withdrawal");

exports.addWithdrawal = async (req, res) => {
    try {

        const withdrawal = await Withdrawal.create(req.body);

        res.status(201).json(withdrawal);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};