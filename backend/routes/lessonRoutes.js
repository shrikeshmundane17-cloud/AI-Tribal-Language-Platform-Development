const express = require('express');
const router = express.Router();
const lessonCtrl = require('../controllers/lessonController');
const { optionalToken } = require('../middleware/authMiddleware');

router.get('/', lessonCtrl.getLessons);
router.post('/', optionalToken, lessonCtrl.createLesson);

module.exports = router;