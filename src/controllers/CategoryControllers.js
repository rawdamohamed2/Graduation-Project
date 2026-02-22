const Category = require("../models/Services/Category");

exports.addCategory = async (req, res) => {
    try {

        const category = await Category.create(req.body);

        res.status(201).json(category);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};