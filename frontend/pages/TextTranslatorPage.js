// BHASHA SETU - REAL-TIME TEXT TRANSLATOR PAGE
let lastTranslatedData = null;

function renderTextTranslatorPage() {
  return `
    <div style="margin-bottom: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <h1 style="font-size: 26px; font-weight: 800;">Real-Time Text Translator</h1>
          <p style="color: var(--text-muted); font-size: 14px; margin-top: 4px;">
            Translate runtime text into 5 verified Indian tribal languages with indigenous scripts
          </p>
        </div>
        <div style="display: flex; gap: 8px;">
          <span class="badge badge-primary">🌿 Santhali (Ol Chiki)</span>
          <span class="badge badge-accent">𑢹𑣉𑣉 Ho (Warang Citi)</span>
        </div>
      </div>
    </div>

    <!-- QUICK PROMPT CHIPS -->
    <div style="margin-bottom: 16px;">
      <span style="font-size: 12px; font-weight: 700; color: var(--text-muted); margin-right: 8px;">Try Sample Prompts:</span>
      <div class="prompt-chips" style="display: inline-flex;">
        <span class="prompt-chip" onclick="setTranslatorPrompt('Good morning, how are you?', 'English', 'Santhali')">"Good morning, how are you?"</span>
        <span class="prompt-chip" onclick="setTranslatorPrompt('नमस्ते, आप कैसे हैं?', 'Hindi', 'Santhali')">"नमस्ते, आप कैसे हैं?"</span>
        <span class="prompt-chip" onclick="setTranslatorPrompt('पानी कहाँ है?', 'Hindi', 'Mundari')">"पानी कहाँ है?" (Mundari)</span>
        <span class="prompt-chip" onclick="setTranslatorPrompt('water is life', 'English', 'Ho')">"water is life" (Ho)</span>
        <span class="prompt-chip" onclick="setTranslatorPrompt('Open your book', 'English', 'Santhali')">"Open your book"</span>
        <span class="prompt-chip" onclick="setTranslatorPrompt('जल ही जीवन है', 'Hindi', 'Kharia')">"जल ही जीवन है" (Kharia)</span>
      </div>
    </div>

    <!-- MAIN TWO-COLUMN TRANSLATOR WORKSPACE -->
    <div class="translator-workspace">
      
      <!-- LEFT COLUMN: INPUT -->
      <div class="translator-card">
        <div class="translator-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">From:</label>
            <select id="source-lang-select" class="form-select" style="width: auto; padding: 6px 12px; font-weight: 700;">
              <option value="Hindi" selected>Hindi (हिन्दी)</option>
              <option value="English">English</option>
            </select>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-outline btn-sm" onclick="pasteInputText()" title="Paste from clipboard">📋 Paste</button>
            <button class="btn btn-outline btn-sm" onclick="clearInputText()" title="Clear text">✕ Clear</button>
          </div>
        </div>

        <textarea 
          id="source-text-input" 
          class="translator-textarea" 
          placeholder="Enter text here... Type or speak any runtime sentence (e.g. 'Good morning' or 'नमस्ते')"
          oninput="updateCharCount()"></textarea>

        <div class="translator-actions">
          <div style="display: flex; align-items: center; gap: 12px;">
            <button 
              id="mic-inline-btn" 
              class="btn btn-outline btn-sm" 
              onclick="handleInlineMic()" 
              style="border-radius: var(--radius-pill); padding: 8px 14px;">
              🎤 <span id="mic-inline-label">Speak</span>
            </button>
            <span id="char-count-label" style="font-size: 12px; color: var(--text-light);">0 characters</span>
          </div>

          <button class="btn btn-primary" onclick="performTranslation()" style="padding: 10px 24px; font-size: 15px;">
            🔤 Translate →
          </button>
        </div>
      </div>

      <!-- RIGHT COLUMN: TRANSLATION RESULT -->
      <div class="translator-card" id="translator-output-card" style="background: #FAFAFA;">
        <div class="translator-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">To:</label>
            <select id="target-lang-select" class="form-select" style="width: auto; padding: 6px 12px; font-weight: 700; color: var(--primary);" onchange="handleTargetLangChange()">
              <option value="Santhali" selected>🌿 Santhali (Santali)</option>
              <option value="Mundari">🌄 Mundari</option>
              <option value="Ho">𑢹 Ho (Warang Citi)</option>
              <option value="Kharia">🌸 Kharia</option>
              <option value="Kurukh">🌾 Kurukh (Oraon)</option>
            </select>
          </div>

          <!-- Script selector -->
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-size: 11px; font-weight: 700; color: var(--text-muted);">Script:</span>
            <select id="script-mode-select" class="form-select" style="width: auto; padding: 4px 8px; font-size: 12px;" onchange="toggleScriptDisplay()">
              <option value="native" selected>Native Script</option>
              <option value="roman">Roman Transliteration</option>
            </select>
          </div>
        </div>

        <!-- Result Container -->
        <div class="translation-result-box" id="translation-result-container">
          <div style="color: var(--text-light); font-size: 16px; font-weight: 400; padding: 20px 0; text-align: center;">
            Translated tribal text will appear here with script and phonetic audio...
          </div>
        </div>

        <div class="translator-actions" id="translator-result-actions" style="display: none;">
          <div style="display: flex; gap: 8px; align-items: center;">
            <span id="result-confidence-badge" class="badge badge-primary">High Confidence</span>
            <span id="result-script-label" style="font-size: 11px; color: var(--text-muted);"></span>
          </div>

          <div style="display: flex; gap: 8px;">
            <button class="btn btn-accent btn-sm" onclick="speakTranslationResult()" title="Listen to tribal pronunciation">
              🔊 Speak
            </button>
            <button class="btn btn-outline btn-sm" onclick="repeatTranslationResult()" title="Repeat speech">
              🔁 Repeat
            </button>
            <button class="btn btn-outline btn-sm" onclick="copyTranslationResult()" title="Copy to clipboard">
              📋 Copy
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- OFFLINE / LINGUISTIC HONESTY BANNER -->
    <div style="margin-top: 24px; padding: 16px 20px; background: var(--bg-surface); border-radius: var(--radius-md); border: 1px solid var(--border); display: flex; align-items: center; gap: 14px;">
      <div style="font-size: 24px;">💡</div>
      <div style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
        <strong>Vernacular Pedagogy Note:</strong> Santhali is rendered in official <strong>Ol Chiki script (ᱚᱞ ᱪᱤᱠᱤ)</strong>, and Ho is rendered in <strong>Warang Citi (𑢹𑣉𑣉)</strong>. To switch between indigenous glyphs and phonetic Latin spelling, use the Script dropdown above.
      </div>
    </div>
  `;
}

function updateCharCount() {
  const input = document.getElementById('source-text-input');
  const label = document.getElementById('char-count-label');
  if (input && label) {
    label.innerText = `${input.value.length} characters`;
  }
}

function clearInputText() {
  const input = document.getElementById('source-text-input');
  if (input) {
    input.value = '';
    updateCharCount();
  }
}

async function pasteInputText() {
  try {
    const text = await navigator.clipboard.readText();
    const input = document.getElementById('source-text-input');
    if (input && text) {
      input.value = text;
      updateCharCount();
    }
  } catch (e) {
    window.apiService.showToast('Clipboard access was not permitted.', 'info');
  }
}

function setTranslatorPrompt(text, sourceLang, targetLang) {
  const sourceInput = document.getElementById('source-text-input');
  const sourceSelect = document.getElementById('source-lang-select');
  const targetSelect = document.getElementById('target-lang-select');

  if (sourceInput) sourceInput.value = text;
  if (sourceSelect) sourceSelect.value = sourceLang;
  if (targetSelect) targetSelect.value = targetLang;

  updateCharCount();
  performTranslation();
}

function handleTargetLangChange() {
  const targetSelect = document.getElementById('target-lang-select');
  const scriptSelect = document.getElementById('script-mode-select');
  if (!targetSelect || !scriptSelect) return;

  const target = targetSelect.value;
  // If target is Mundari or Kharia, default to Roman/Devanagari
  if (target === 'Mundari' || target === 'Kharia' || target === 'Kurukh') {
    scriptSelect.value = 'roman';
  } else {
    scriptSelect.value = 'native';
  }

  // Re-translate if input already exists
  const input = document.getElementById('source-text-input');
  if (input && input.value.trim()) {
    performTranslation();
  }
}

async function performTranslation() {
  const input = document.getElementById('source-text-input');
  const sourceSelect = document.getElementById('source-lang-select');
  const targetSelect = document.getElementById('target-lang-select');
  const scriptSelect = document.getElementById('script-mode-select');
  const resultBox = document.getElementById('translation-result-container');
  const actionsBar = document.getElementById('translator-result-actions');

  if (!input || !input.value.trim()) {
    window.apiService.showToast('Please enter text to translate.', 'info');
    return;
  }

  const text = input.value.trim();
  const sourceLang = sourceSelect ? sourceSelect.value : 'Hindi';
  const targetLang = targetSelect ? targetSelect.value : 'Santhali';
  const scriptMode = scriptSelect ? scriptSelect.value : 'native';

  resultBox.innerHTML = '<div style="color: var(--text-muted); font-size: 15px; padding: 20px 0;"><span style="display:inline-block; animation: spin 1s infinite;">⏳</span> Translating text...</div>';

  try {
    const res = await window.apiService.post('/translate', {
      text,
      sourceLang,
      targetLang,
      scriptMode
    });

    if (!res.success) {
      resultBox.innerHTML = `
        <div style="background: var(--danger-bg); border: 1px solid #FFCDD2; border-radius: var(--radius-md); padding: 16px; color: var(--danger);">
          <div style="font-weight: 700; margin-bottom: 4px;">⚠️ ${res.confidence || 'Translation Unavailable'}</div>
          <div style="font-size: 13px; line-height: 1.5;">${res.message}</div>
          <div style="margin-top: 12px;">
            <button class="btn btn-outline btn-sm" onclick="window.location.hash='#settings'" style="background: #fff;">
              ⚙️ Configure Online API Provider
            </button>
          </div>
        </div>
      `;
      if (actionsBar) actionsBar.style.display = 'none';
      return;
    }

    lastTranslatedData = res;

    // Render result
    let resultHtml = '';

    if (res.nativeScriptText && res.nativeScriptText !== res.translatedText && scriptMode === 'native') {
      resultHtml += `
        <div class="native-script-display" title="Indigenous Script">${res.nativeScriptText}</div>
        <div class="roman-translit-display">Pronunciation (Roman): ${res.translatedText}</div>
      `;
    } else {
      resultHtml += `
        <div style="font-size: 22px; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">
          ${res.translatedText}
        </div>
      `;
      if (res.nativeScriptText && res.nativeScriptText !== res.translatedText) {
        resultHtml += `
          <div style="font-size: 14px; color: var(--text-muted);">Native Script: ${res.nativeScriptText}</div>
        `;
      }
    }

    resultBox.innerHTML = resultHtml;

    // Update confidence badge & script info
    const confBadge = document.getElementById('result-confidence-badge');
    const scriptLabel = document.getElementById('result-script-label');
    if (confBadge) confBadge.innerText = res.confidence || 'Verified';
    if (scriptLabel) scriptLabel.innerText = `${res.targetLang} · ${res.scriptName}`;
    if (actionsBar) actionsBar.style.display = 'flex';

    window.apiService.showToast(`Translated to ${res.targetLang}`, 'success');

  } catch (err) {
    resultBox.innerHTML = `<div style="color: var(--danger); font-size: 14px;">Error: ${err.message}</div>`;
    if (actionsBar) actionsBar.style.display = 'none';
  }
}

function toggleScriptDisplay() {
  if (lastTranslatedData) {
    performTranslation();
  }
}

function speakTranslationResult() {
  if (!lastTranslatedData || !lastTranslatedData.translatedText) {
    window.apiService.showToast('No translation to speak.', 'info');
    return;
  }
  window.speechService.speak(lastTranslatedData.translatedText);
}

function repeatTranslationResult() {
  speakTranslationResult();
}

function copyTranslationResult() {
  if (!lastTranslatedData) return;
  const scriptSelect = document.getElementById('script-mode-select');
  const useNative = scriptSelect && scriptSelect.value === 'native';
  const textToCopy = useNative && lastTranslatedData.nativeScriptText ? lastTranslatedData.nativeScriptText : lastTranslatedData.translatedText;
  
  navigator.clipboard.writeText(textToCopy).then(() => {
    window.apiService.showToast('Copied translation to clipboard!', 'success');
  });
}

function handleInlineMic() {
  const sourceSelect = document.getElementById('source-lang-select');
  const input = document.getElementById('source-text-input');
  const micLabel = document.getElementById('mic-inline-label');
  const sourceLang = sourceSelect ? sourceSelect.value : 'Hindi';

  if (window.speechService.isListening) {
    window.speechService.stopListening();
    if (micLabel) micLabel.innerText = 'Speak';
    return;
  }

  if (micLabel) micLabel.innerText = 'Listening...';

  window.speechService.startListening(
    sourceLang,
    (interim) => {
      if (input) input.value = interim;
    },
    (final) => {
      if (input) {
        input.value = final;
        updateCharCount();
      }
      if (micLabel) micLabel.innerText = 'Speak';
      performTranslation();
    },
    (err) => {
      if (micLabel) micLabel.innerText = 'Speak';
      window.apiService.showToast('Microphone error or permission denied.', 'error');
    }
  );
}