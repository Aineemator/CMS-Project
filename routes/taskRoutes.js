const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createTask,
  getTasks,
  getAllTasks,
  updateTask,
  deleteTask,
  getStats,
  getAnalytics,
} = require("../controller/taskController");

// ==============================
// USER ROUTES
// ==============================

// Create Complaint
router.post("/", auth, createTask);

// View Own Complaints
router.get("/", auth, getTasks);

// Complaint Statistics
router.get("/stats", auth, getStats);

// ==============================
// ADMIN ROUTES
// ==============================

// Dashboard Analytics
router.get("/analytics", auth, admin, getAnalytics);

// View All Complaints
router.get("/all", auth, admin, getAllTasks);

// Update Complaint Status
router.put("/:id", auth, admin, updateTask);

// Delete Complaint
router.delete("/:id", auth, admin, deleteTask);

module.exports = router;