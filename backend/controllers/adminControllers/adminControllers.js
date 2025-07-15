const expressAsyncHandler = require("express-async-handler");
const AdminModel = require("../../models/AdminModel");
const jwt = require("jsonwebtoken");


const loginAdmin = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide email and password');
    }

    const admin = await AdminModel.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '2d' }
        );

        res.cookie("adminToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
        });

        return res.status(200).json({
            _id: admin._id,
            username: admin.username,
            email: admin.email,
            role: admin.role,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

const createAdmin = expressAsyncHandler(async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
        res.status(400);
        throw new Error("Please provide all required fields");
    }

    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
        res.status(400);
        throw new Error("Admin with this email already exists");
    }

    const admin = await AdminModel.create({ username, email, password, role });

    if (admin) {
        return res.status(201).json({
            _id: admin._id,
            username: admin.username,
            email: admin.email,
            role: admin.role,
        });
    } else {
        res.status(500);
        throw new Error("Failed to create admin");
    }
});

module.exports = { loginAdmin, createAdmin };
