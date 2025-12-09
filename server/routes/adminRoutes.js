const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getAllAppointments,
    deleteUser,
    getStats
} = require('../controllers/adminController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// All routes are protected and restricted to admin
router.use(protect);
router.use(restrictTo('admin'));

router.get('/users', getAllUsers);
router.get('/appointments', getAllAppointments);
router.delete('/user/:id', deleteUser);
router.get('/stats', getStats);

module.exports = router;
