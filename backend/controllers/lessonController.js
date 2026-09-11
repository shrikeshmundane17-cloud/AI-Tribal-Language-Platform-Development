const db = require('../services/databaseService');

exports.getLessons = (req, res) => {
  const { subject, targetLanguage } = req.query;
  const lessons = db.getLessons({ subject, targetLanguage });
  res.json({ success: true, lessons });
};

exports.createLesson = (req, res) => {
  try {
    const { title, subject, sourceLanguage, targetLanguage, contentOriginal, contentTranslated, script } = req.body;

    if (!title || !subject || !contentOriginal) {
      return res.status(400).json({ success: false, message: 'Title, subject and original content are required.' });
    }

    const lesson = db.createLesson({
      teacherId: req.user ? req.user.id : 'teacher_demo',
      teacherName: req.user ? req.user.name : 'Demo Teacher',
      title,
      subject,
      sourceLanguage: sourceLanguage || 'Hindi',
      targetLanguage: targetLanguage || 'Santhali',
      contentOriginal,
      contentTranslated: contentTranslated || '',
      script: script || 'Ol Chiki / Roman'
    });

    res.status(201).json({ success: true, message: 'Lesson created successfully.', lesson });
  } catch (err) {
    console.error('Lesson creation error:', err);
    res.status(500).json({ success: false, message: 'Failed to create lesson.' });
  }
};