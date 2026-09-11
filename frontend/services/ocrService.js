// BHASHA SETU - OCR SCANNER SERVICE
class OCRService {
  async getPresets() {
    try {
      const res = await window.apiService.get('/ocr/presets');
      return res.presets || [];
    } catch (e) {
      return [];
    }
  }

  async processPreset(presetId) {
    return await window.apiService.post('/ocr/process', { presetId });
  }

  async processCustomText(text) {
    return await window.apiService.post('/ocr/process', { text });
  }
}

window.ocrService = new OCRService();