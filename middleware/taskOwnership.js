const Task = require("../models/Task");

module.exports = async (req, res, next) => {
    try {
        const task = await Task.findById(
            req.params.id
        );

    if (!task) {
        return res.status(400).json({
            message: "Task Not Found"
        });
    }

    if (
        task.userId.toString() !== req.user.id
    ) {
        return res.status(403).json({
            message: "Unauthorized Access"
        });
    }

    next();
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};