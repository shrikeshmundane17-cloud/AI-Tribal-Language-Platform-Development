const db = require('../services/databaseService');

exports.getQuizzes = (req, res) => {
  const { language, difficulty } = req.query;
  const quizzes = db.getQuizzes({ language, difficulty });
  res.json({ success: true, quizzes });
};

exports.createQuiz = (req, res) => {
  try {
    const { question, correctAnswer, options, language, difficulty, subject } = req.body;

    if (!question || !correctAnswer || !language) {
      return res.status(400).json({ success: false, message: 'Question, correct answer, and language are required.' });
    }

    const quiz = db.createQuiz({
      teacherId: req.user ? req.user.id : 'teacher_demo',
      question,
      correctAnswer,
      options: options || [correctAnswer],
      language,
      difficulty: difficulty || 'Easy',
      subject: subject || 'General'
    });

    res.status(201).json({ success: true, message: 'Quiz created successfully.', quiz });
  } catch (err) {
    console.error('Quiz creation error:', err);
    res.status(500).json({ success: false, message: 'Failed to create quiz.' });
  }
};

exports.submitQuizResponse = (req, res) => {
  try {
    const { quizId, studentAnswer } = req.body;

    if (!quizId || studentAnswer === undefined) {
      return res.status(400).json({ success: false, message: 'Quiz ID and student answer are required.' });
    }

    const quiz = db.getQuizById(quizId);
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz question not found.' });
    }

    const cleanInput = (studentAnswer || '').toString().toLowerCase().trim().replace(/[.,!]/g, '');
    const cleanCorrect = (quiz.correctAnswer || '').toString().toLowerCase().trim().replace(/[.,!]/g, '');

    const isCorrect = cleanInput === cleanCorrect || cleanInput.includes(cleanCorrect) || cleanCorrect.includes(cleanInput);
    const score = isCorrect ? 10 : 0;

    const response = db.recordQuizResponse({
      quizId,
      studentId: req.user ? req.user.id : 'student_guest',
      studentName: req.user ? req.user.name : 'Student Guest',
      studentAnswer,
      correctAnswer: quiz.correctAnswer,
      isCorrect,
      score
    });

    res.json({
      success: true,
      isCorrect,
      score,
      correctAnswer: quiz.correctAnswer,
      feedback: isCorrect ? 'Sahi Jawab! Well done!' : `Galat jawab. The correct answer was: ${quiz.correctAnswer}`,
      response
    });
  } catch (err) {
    console.error('Quiz submit error:', err);
    res.status(500).json({ success: false, message: 'Failed to submit quiz response.' });
  }
};

exports.getResponses = (req, res) => {
  const { studentId, quizId } = req.query;
  const responses = db.getQuizResponses({ studentId, quizId });
  res.json({ success: true, responses });
};