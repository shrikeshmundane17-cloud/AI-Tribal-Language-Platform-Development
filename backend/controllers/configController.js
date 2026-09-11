const db = require('../services/databaseService');

exports.getStatus = (req, res) => {
  const settings = db.getSettings();
  const translations = db.getTranslationHistory();
  const lessons = db.getLessons();
  const quizzes = db.getQuizzes();
  const responses = db.getQuizResponses();

  res.json({
    success: true,
    platform: 'Bhasha Setu',
    version: '2.0.0',
    mode: settings.activeProvider === 'demo' ? 'Demo / Local Mode' : 'Online Translation',
    provider: settings.activeProvider,
    offlineReady: true,
    totalTranslations: translations.length,
    totalLessons: lessons.length,
    totalQuizzes: quizzes.length,
    totalResponses: responses.length,
    languagesSupported: 5,
    settings
  });
};

exports.updateSettings = (req, res) => {
  const updated = db.updateSettings(req.body);
  res.json({ success: true, message: 'Settings updated successfully.', settings: updated });
};