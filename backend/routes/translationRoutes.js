const express = require('express');
const router = express.Router();
const transCtrl = require('../controllers/translationController');
const { optionalToken } = require('../middleware/authMiddleware');

router.post('/translate', optionalToken, transCtrl.translate);
router.post('/detect', transCtrl.detect);
router.get('/languages', transCtrl.getSupportedLanguages);
router.get('/history', optionalToken, transCtrl.getHistory);
router.delete('/history/:id', optionalToken, transCtrl.deleteHistoryItem);
router.delete('/history', optionalToken, transCtrl.clearHistory);

module.exports = router;