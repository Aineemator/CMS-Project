const Task = require("../models/Task");
const User = require("../models/User");

// ==============================
// CREATE COMPLAINT
// ==============================

exports.createTask = async (req, res) => {
    try {

        const {
            title,
            category,
            priority,
            description
        } = req.body;

        const task = await Task.create({
            title,
            category,
            priority,
            description,
            status: "Pending",
            userId: req.user.id
        });

        res.status(201).json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// ==============================
// USER GET OWN COMPLAINTS
// ==============================

exports.getTasks = async (req, res) => {

    try {

        const tasks = await Task.find({
            userId: req.user.id
        });

        res.json(tasks);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ==============================
// ADMIN GET ALL COMPLAINTS
// ==============================

exports.getAllTasks = async (req, res) => {

    try {

        const tasks = await Task.find()
            .populate("userId", "name email");

        res.json(tasks);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ==============================
// UPDATE STATUS
// ==============================

exports.updateTask = async (req, res) => {

    try {

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            },
            {
                new: true
            }
        );

        res.json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ==============================
// DELETE COMPLAINT
// ==============================

exports.deleteTask = async (req, res) => {

    try {

        await Task.findByIdAndDelete(req.params.id);

        res.json({
            message: "Complaint Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ==============================
// USER DASHBOARD STATS
// ==============================

exports.getStats = async (req, res) => {

    try {

        const total = await Task.countDocuments({
            userId: req.user.id
        });

        const pending = await Task.countDocuments({
            userId: req.user.id,
            status: "Pending"
        });

        const progress = await Task.countDocuments({
            userId: req.user.id,
            status: "In Progress"
        });

        const resolved = await Task.countDocuments({
            userId: req.user.id,
            status: "Resolved"
        });

        res.json({
            total,
            pending,
            progress,
            resolved
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ==============================
// ADMIN DASHBOARD ANALYTICS
// ==============================

exports.getAnalytics = async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();

        const totalComplaints = await Task.countDocuments();

        const pending = await Task.countDocuments({
            status: "Pending"
        });

        const progress = await Task.countDocuments({
            status: "In Progress"
        });

        const resolved = await Task.countDocuments({
            status: "Resolved"
        });

        res.json({
            totalUsers,
            totalComplaints,
            pending,
            progress,
            resolved
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};