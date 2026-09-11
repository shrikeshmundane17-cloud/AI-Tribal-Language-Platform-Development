const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);
router.post('/google', authCtrl.googleLogin);
router.get('/profile', authenticateToken, authCtrl.getProfile);

module.exports = router;