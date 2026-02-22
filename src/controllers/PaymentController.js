const Payment = require("../models/Payments/Payment");

exports.addPayment = async (req, res) => {
    try {

        const payment = await Payment.create(req.body);

        res.status(201).json(payment);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};