const express = require('express');
const router = express.Router();
const ocrCtrl = require('../controllers/ocrController');

router.get('/presets', ocrCtrl.getPresets);
router.post('/process', ocrCtrl.processScan);

module.exports = router;