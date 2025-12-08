const User = require("../models/User");
const Appointment = require("../models/Appointment");

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all appointments
// @route   GET /api/admin/appointments
// @access  Private (Admin)
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({})
            .populate("studentId", "name email")
            .populate("counselorId", "name email")
            .sort({ date: -1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/admin/user/:id
// @access  Private (Admin)
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.deleteOne();
            res.json({ message: "User removed" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get system stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
const getStats = async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: "student" });
        const totalCounselors = await User.countDocuments({ role: "counselor" });
        const totalAppointments = await Appointment.countDocuments({});

        res.json({
            totalStudents,
            totalCounselors,
            totalAppointments,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    getAllAppointments,
    deleteUser,
    getStats,
};
