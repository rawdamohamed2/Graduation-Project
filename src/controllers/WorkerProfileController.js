const WorkerProfile = require("../models/Accounts/WorkerProfile");

exports.addWorkerProfile = async (req, res) => {
    try {

        const worker = await WorkerProfile.create(req.body);

        res.status(201).json({
            success: true,
            data: worker
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};