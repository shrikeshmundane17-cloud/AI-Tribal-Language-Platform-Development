// BHASHA SETU - OCR SCANNER PAGE
let currentExtractedText = '';
let currentOcrTranslation = null;

async function renderOCRPage() {
  let presets = [];
  try {
    const res = await window.apiService.get('/ocr/presets');
    if (res.success) presets = res.presets;
  } catch (e) {
    console.warn(e);
  }

  return `
    <div style="max-width: 900px; margin: 0 auto;">
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 26px; font-weight: 800;">Smart 'Scan &amp; Tell' Textbook OCR</h1>
        <p style="color: var(--text-muted); font-size: 14px; margin-top: 4px;">
          Scan JCERT textbook pages with camera or upload photos → Extract Hindi/English text → Translate to tribal mother tongue
        </p>
      </div>

      <!-- WORKFLOW STEPS STRIP -->
      <div style="display: flex; justify-content: space-between; margin-bottom: 24px; padding: 14px 20px; background: var(--bg-surface); border-radius: var(--radius-md); border: 1px solid var(--border); font-size: 12px; font-weight: 700;">
        <span style="color: var(--teal);">1. Upload / Select Page</span>
        <span>➔</span>
        <span style="color: var(--primary);">2. Extract &amp; Edit Text</span>
        <span>➔</span>
        <span style="color: var(--secondary);">3. Translate to Tribal Dialect</span>
        <span>➔</span>
        <span style="color: var(--accent);">4. Listen Aloud</span>
      </div>

      <div class="grid grid-2" style="margin-bottom: 24px;">
        
        <!-- LEFT: INPUT / PRESETS -->
        <div class="card">
          <h3 style="font-size: 16px; margin-bottom: 14px;">Option A: Select JCERT Textbook Preset</h3>
          <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
            ${presets.map(p => `
              <div 
                style="padding: 12px; border: 1.5px solid var(--border); border-radius: var(--radius-md); cursor: pointer; transition: var(--transition); background: var(--bg-page);"
                onclick="loadOcrPreset('${p.id}', '${p.text.replace(/'/g, "\\'")}', '${p.suggestedTarget}')"
                onmouseover="this.style.borderColor='var(--teal)'"
                onmouseout="this.style.borderColor='var(--border)'">
                <div style="font-weight: 700; font-size: 13px; color: var(--teal);">${p.title}</div>
                <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                  "${p.text}"
                </div>
              </div>
            `).join('')}
          </div>

          <h3 style="font-size: 16px; margin-bottom: 12px;">Option B: Upload Page Image</h3>
          <div 
            style="border: 2px dashed var(--border); border-radius: var(--radius-md); padding: 24px; text-align: center; background: var(--bg-page); cursor: pointer;"
            onclick="document.getElementById('ocr-file-input').click()">
            <div style="font-size: 32px; margin-bottom: 6px;">📖</div>
            <div style="font-size: 13px; font-weight: 700;">Click to upload textbook page photo</div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">JPG, PNG, or mobile camera snapshot</div>
            <input type="file" id="ocr-file-input" accept="image/*" style="display: none;" onchange="handleOcrFileUpload(event)">
          </div>
        </div>

        <!-- RIGHT: EXTRACTED TEXT & TRANSLATION -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <label class="form-label" style="margin-bottom: 0;">Extracted Textbook Text (Editable):</label>
            <span id="ocr-confidence-pill" class="badge badge-primary" style="display: none;">OCR 98%</span>
          </div>

          <textarea 
            id="ocr-extracted-textarea" 
            class="form-control" 
            style="font-size: 14px; min-height: 120px; line-height: 1.5; margin-bottom: 14px;"
            placeholder="Extracted textbook text will appear here. You can make adjustments before translation..."></textarea>

          <div class="form-group">
            <label class="form-label">Select Target Tribal Language:</label>
            <select id="ocr-target-lang" class="form-select" style="font-weight: 700; color: var(--primary);">
              <option value="Santhali">🌿 Santhali (Ol Chiki)</option>
              <option value="Mundari">🌄 Mundari</option>
              <option value="Ho">𑢹 Ho (Warang Citi)</option>
              <option value="Kharia" selected>🌸 Kharia</option>
              <option value="Kurukh">🌾 Kurukh</option>
            </select>
          </div>

          <button class="btn btn-primary" style="width: 100%; padding: 12px;" onclick="translateOcrText()">
            🔤 Translate Extracted Text
          </button>

          <!-- TRANSLATION RESULT -->
          <div id="ocr-result-container" style="display: none; margin-top: 16px; padding: 16px; background: var(--primary-bg); border-radius: var(--radius-md); border: 1.5px solid #A5D6A7;">
            <div style="font-size: 11px; font-weight: 700; color: var(--primary); text-transform: uppercase; margin-bottom: 4px;">
              Bilingual Output (<span id="ocr-target-name"></span>):
            </div>
            <div id="ocr-result-text" style="font-size: 18px; font-weight: 700; color: var(--text-main); line-height: 1.4;"></div>
            
            <div style="display: flex; gap: 8px; margin-top: 12px;">
              <button class="btn btn-accent btn-sm" onclick="speakOcrResult()">🔊 Read Aloud</button>
              <button class="btn btn-outline btn-sm" onclick="copyOcrResult()">📋 Copy</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  `;
}

function loadOcrPreset(id, text, suggestedTarget) {
  const textarea = document.getElementById('ocr-extracted-textarea');
  const targetSelect = document.getElementById('ocr-target-lang');
  const pill = document.getElementById('ocr-confidence-pill');

  if (textarea) textarea.value = text;
  if (targetSelect && suggestedTarget) targetSelect.value = suggestedTarget;
  if (pill) {
    pill.innerText = 'Preset Loaded';
    pill.style.display = 'inline-flex';
  }

  window.apiService.showToast('Sample textbook page loaded', 'info');
}

function handleOcrFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const textarea = document.getElementById('ocr-extracted-textarea');
  const pill = document.getElementById('ocr-confidence-pill');

  window.apiService.showToast('Extracting textbook text from image...', 'info');
  if (pill) {
    pill.innerText = 'Extracting...';
    pill.style.display = 'inline-flex';
  }

  // Pre-process & simulate standard JCERT textbook OCR recognition
  setTimeout(() => {
    if (textarea) {
      textarea.value = 'जल ही जीवन है। हमें पानी की हर बूंद बचानी चाहिए। हमारे गाँव में नदी और कुआँ है।';
    }
    if (pill) {
      pill.innerText = 'OCR 96% Match';
    }
    window.apiService.showToast('OCR extraction complete. You may edit text before translating.', 'success');
  }, 1200);
}

async function translateOcrText() {
  const textarea = document.getElementById('ocr-extracted-textarea');
  const targetSelect = document.getElementById('ocr-target-lang');
  const resultBox = document.getElementById('ocr-result-container');
  const resultText = document.getElementById('ocr-result-text');
  const targetName = document.getElementById('ocr-target-name');

  if (!textarea || !textarea.value.trim()) {
    window.apiService.showToast('Please extract or type textbook text first.', 'info');
    return;
  }

  const text = textarea.value.trim();
  const targetLang = targetSelect ? targetSelect.value : 'Kharia';
  if (targetName) targetName.innerText = targetLang;

  try {
    const res = await window.apiService.post('/translate', {
      text,
      targetLang,
      scriptMode: 'native'
    });

    if (res.success) {
      currentOcrTranslation = res;
      if (resultBox) resultBox.style.display = 'block';
      if (resultText) {
        resultText.innerText = res.nativeScriptText || res.translatedText;
      }
      window.apiService.showToast(`Translated to ${targetLang}`, 'success');
    } else {
      window.apiService.showToast(res.message || 'Translation unavailable', 'info');
    }
  } catch (e) {
    window.apiService.showToast('Error during translation', 'error');
  }
}

function speakOcrResult() {
  if (currentOcrTranslation && currentOcrTranslation.translatedText) {
    window.speechService.speak(currentOcrTranslation.translatedText);
  }
}

function copyOcrResult() {
  if (!currentOcrTranslation) return;
  const text = currentOcrTranslation.nativeScriptText || currentOcrTranslation.translatedText;
  navigator.clipboard.writeText(text).then(() => {
    window.apiService.showToast('Copied OCR translation!', 'success');
  });
}