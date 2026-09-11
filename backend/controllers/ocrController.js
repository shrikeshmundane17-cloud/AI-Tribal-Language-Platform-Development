const db = require('../services/databaseService');

exports.getPresets = (req, res) => {
  const presets = db.getOcrPresets();
  res.json({ success: true, presets });
};

exports.processScan = (req, res) => {
  try {
    const { text, presetId } = req.body;

    if (presetId) {
      const presets = db.getOcrPresets();
      const match = presets.find(p => p.id === presetId);
      if (match) {
        return res.json({
          success: true,
          extractedText: match.text,
          presetTitle: match.title,
          suggestedTarget: match.suggestedTarget,
          confidence: 0.98
        });
      }
    }

    if (text) {
      return res.json({
        success: true,
        extractedText: text,
        confidence: 0.95
      });
    }

    return res.status(400).json({ success: false, message: 'Image or text data required for OCR.' });
  } catch (err) {
    console.error('OCR error:', err);
    res.status(500).json({ success: false, message: 'OCR processing error.' });
  }
};