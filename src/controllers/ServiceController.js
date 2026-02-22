const Service = require("../models/Services/Service");

exports.addService = async (req, res) => {
    try {

        const service = await Service.create(req.body);

        res.status(201).json(service);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};