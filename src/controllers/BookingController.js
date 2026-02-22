const Booking = require("../models/Booking/Booking");

exports.addBooking = async (req, res) => {
    try {

        const booking = await Booking.create(req.body);

        res.status(201).json(booking);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};