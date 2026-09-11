const translationService = require('../services/translationService');
const db = require('../services/databaseService');

exports.translate = async (req, res) => {
  try {
    const { text, sourceLang, targetLang, scriptMode, provider } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: 'Text is required for translation.' });
    }

    const settings = db.getSettings();
    const activeProvider = provider || settings.activeProvider || 'demo';

    const result = await translationService.translate({
      text,
      sourceLang,
      targetLang,
      scriptMode: scriptMode || 'native',
      provider: activeProvider
    });

    if (result.success) {
      // Record history
      const historyItem = db.addTranslationHistory({
        userId: req.user ? req.user.id : 'guest',
        userName: req.user ? req.user.name : 'Guest User',
        sourceLanguage: result.sourceLang,
        targetLanguage: result.targetLang,
        sourceText: result.sourceText,
        translatedText: result.translatedText,
        nativeScriptText: result.nativeScriptText,
        script: result.scriptName,
        confidence: result.confidence,
        provider: result.provider
      });
      result.historyId = historyItem.id;
    }

    return res.json(result);
  } catch (err) {
    console.error('Translation error:', err);
    return res.status(500).json({ success: false, message: 'Translation service error.' });
  }
};

exports.detect = (req, res) => {
  const { text } = req.body;
  const detected = translationService.detectLanguage(text);
  res.json({ success: true, detectedLanguage: detected });
};

exports.getSupportedLanguages = (req, res) => {
  const list = translationService.getSupportedLanguages();
  res.json({ success: true, languages: list });
};

exports.getHistory = (req, res) => {
  const userId = req.user ? req.user.id : null;
  const history = db.getTranslationHistory(userId);
  res.json({ success: true, history });
};

exports.deleteHistoryItem = (req, res) => {
  const { id } = req.params;
  const deleted = db.deleteTranslationHistoryItem(id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'History item not found.' });
  }
  res.json({ success: true, message: 'History item deleted.' });
};

exports.clearHistory = (req, res) => {
  const userId = req.user ? req.user.id : null;
  db.clearTranslationHistory(userId);
  res.json({ success: true, message: 'Translation history cleared.' });
};