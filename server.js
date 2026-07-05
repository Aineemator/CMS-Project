require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");
const User = require("./models/User");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes"); // Make sure this file is named taskRoutes.js
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// ======================
// CONNECT DATABASE
// ======================
connectDB();

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ======================
// ROUTES
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoutes);

// ======================
// CREATE DEFAULT ADMIN
// ======================
const createAdmin = async () => {
  try {
    const admin = await User.findOne({
      email: "cmsproject@gmail.com",
    });

    if (!admin) {
      const hashedPassword = await bcrypt.hash("1234567", 10);

      await User.create({
        name: "System Admin",
        email: "cmsproject@gmail.com",
        password: hashedPassword,
        role: "Admin",
      });

      console.log("✅ Default Admin Created Successfully");
    } else {
      console.log("✅ Default Admin Already Exists");
    }
  } catch (error) {
    console.error("❌ Admin Creation Error:", error);
  }
};

// ======================
// START SERVER
// ======================
const PORT = process.env.PORT || 1000;

app.listen(PORT, async () => {
  console.log(`✅ Server running on port ${PORT}`);

  // Create admin after server starts
  await createAdmin();
});