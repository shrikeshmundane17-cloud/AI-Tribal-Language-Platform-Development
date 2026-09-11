const express = require('express');
const router = express.Router();
const quizCtrl = require('../controllers/quizController');
const { optionalToken } = require('../middleware/authMiddleware');

router.get('/', quizCtrl.getQuizzes);
router.post('/', optionalToken, quizCtrl.createQuiz);
router.post('/submit', optionalToken, quizCtrl.submitQuizResponse);
router.get('/responses', optionalToken, quizCtrl.getResponses);

module.exports = router;