const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCounselors } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/counselors', getCounselors);

module.exports = router;
