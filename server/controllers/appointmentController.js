const Appointment = require("../models/Appointment");

// @desc    Book an appointment
// @route   POST /api/appointment/book
// @access  Private (Student)
const bookAppointment = async (req, res) => {
    const { counselorId, date, time, concern } = req.body;

    try {
        const appointment = await Appointment.create({
            studentId: req.user._id,
            counselorId,
            date,
            time,
            concern,
        });

        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in student's appointments
// @route   GET /api/appointment/my
// @access  Private (Student)
const getMyAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ studentId: req.user._id })
            .populate("counselorId", "name email")
            .sort({ date: 1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in counselor's appointments
// @route   GET /api/appointment/counselor
// @access  Private (Counselor)
const getCounselorAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ counselorId: req.user._id })
            .populate("studentId", "name email")
            .sort({ date: 1 });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update appointment status
// @route   PATCH /api/appointment/:id/status
// @access  Private (Counselor)
const updateAppointmentStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        // Ensure only the assigned counselor can update
        if (appointment.counselorId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        appointment.status = status;
        await appointment.save();

        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    bookAppointment,
    getMyAppointments,
    getCounselorAppointments,
    updateAppointmentStatus,
};
