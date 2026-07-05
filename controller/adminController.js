const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await User.findOne({
            email,
            role: "Admin"
        });

        console.log("Admin Found:", admin);

        if (!admin) {
            return res.status(400).json({
                message: "Admin not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );

        console.log("Password Match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign(
            {
                id: admin._id,
                role: admin.role
            },

            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            role: admin.role
        });
    }

    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};