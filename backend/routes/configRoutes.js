const express = require('express');
const router = express.Router();
const configCtrl = require('../controllers/configController');
const { optionalToken } = require('../middleware/authMiddleware');

router.get('/status', configCtrl.getStatus);
router.post('/settings', optionalToken, configCtrl.updateSettings);

module.exports = router;