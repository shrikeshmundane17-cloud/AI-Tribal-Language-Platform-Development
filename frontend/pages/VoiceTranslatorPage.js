// BHASHA SETU - VOICE TRANSLATOR PAGE
let voiceCurrentStep = 1;
let voiceSpokenText = '';
let voiceTranslatedData = null;

function renderVoiceTranslatorPage() {
  return `
    <div style="max-width: 800px; margin: 0 auto;">
      <div style="margin-bottom: 24px; text-align: center;">
        <h1 style="font-size: 26px; font-weight: 800;">Live Teacher Mic Voice Translator</h1>
        <p style="color: var(--text-muted); font-size: 14px; margin-top: 4px;">
          Speak lesson instruction in Hindi/English → Real-time mother tongue audio for tribal children
        </p>
      </div>

      <div class="card" style="padding: 32px 28px; text-align: center;">
        
        <!-- LANGUAGE SELECTION ROW -->
        <div style="display: flex; justify-content: center; align-items: center; gap: 14px; margin-bottom: 30px; flex-wrap: wrap;">
          <div style="text-align: left;">
            <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Teacher Speaks (From):</label>
            <select id="voice-source-lang" class="form-select" style="font-weight: 700;">
              <option value="Hindi" selected>Hindi (हिन्दी)</option>
              <option value="English">English</option>
            </select>
          </div>

          <div style="font-size: 22px; color: var(--primary); margin-top: 18px;">➔</div>

          <div style="text-align: left;">
            <label style="font-size: 11px; font-weight: 700; color: var(--primary); text-transform: uppercase;">Child Hears (To):</label>
            <select id="voice-target-lang" class="form-select" style="font-weight: 700; color: var(--primary);">
              <option value="Santhali" selected>🌿 Santhali (Ol Chiki)</option>
              <option value="Mundari">🌄 Mundari</option>
              <option value="Ho">𑢹 Ho (Warang Citi)</option>
              <option value="Kharia">🌸 Kharia</option>
              <option value="Kurukh">🌾 Kurukh</option>
            </select>
          </div>
        </div>

        <!-- BIG PULSING MICROPHONE BUTTON -->
        <div style="margin: 20px 0;">
          <button 
            id="voice-mic-main-btn" 
            class="mic-action-btn" 
            onclick="toggleVoiceRecording()" 
            title="Click to speak">
            🎤
          </button>
          <div id="voice-status-text" style="font-size: 15px; font-weight: 700; color: var(--text-muted); margin-top: 12px;">
            Click microphone and speak into your device
          </div>
        </div>

        <!-- RECOGNIZED SPOKEN TEXT -->
        <div id="voice-spoken-card" style="display: none; background: var(--accent-bg); border-radius: var(--radius-md); padding: 18px; margin: 20px 0; text-align: left; border-left: 4px solid var(--accent);">
          <div style="font-size: 11px; font-weight: 700; color: var(--accent); text-transform: uppercase; margin-bottom: 4px;">
            Teacher Said:
          </div>
          <div id="voice-spoken-text" style="font-size: 18px; font-weight: 700; color: var(--text-main);"></div>
        </div>

        <!-- TRANSLATED TRIBAL RESULT -->
        <div id="voice-result-card" style="display: none; background: var(--primary-bg); border-radius: var(--radius-md); padding: 20px; margin: 20px 0; text-align: left; border: 2px solid #A5D6A7;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <div style="font-size: 11px; font-weight: 700; color: var(--primary); text-transform: uppercase;">
              Child Hears in <span id="voice-target-label">Santhali</span>:
            </div>
            <span class="badge badge-primary">Spoken Aloud 🔊</span>
          </div>

          <div id="voice-result-native" style="font-size: 26px; font-weight: 800; color: var(--primary); margin-bottom: 4px;"></div>
          <div id="voice-result-roman" style="font-size: 16px; color: var(--text-muted); font-style: italic;"></div>

          <div style="display: flex; gap: 8px; margin-top: 16px;">
            <button class="btn btn-accent btn-sm" onclick="speakVoiceResult()">🔊 Re-play Audio</button>
            <button class="btn btn-outline btn-sm" onclick="window.speechService.stop()">⏹ Stop</button>
          </div>
        </div>

        <!-- SAMPLE SPEECH BUTTONS FOR EASY DEMONSTRATION -->
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px dashed var(--border); text-align: left;">
          <div style="font-size: 12px; font-weight: 700; color: var(--text-muted); margin-bottom: 8px;">
            ⚡ Quick Voice Simulations (Click to test without microphone):
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn btn-outline btn-sm" onclick="simulateVoiceInput('नमस्ते, आप कैसे हैं?', 'Hindi', 'Santhali')">
              🗣️ "नमस्ते, आप कैसे हैं?"
            </button>
            <button class="btn btn-outline btn-sm" onclick="simulateVoiceInput('पानी कहाँ है?', 'Hindi', 'Mundari')">
              🗣️ "पानी कहाँ है?"
            </button>
            <button class="btn btn-outline btn-sm" onclick="simulateVoiceInput('अपनी किताब खोलो', 'Hindi', 'Santhali')">
              🗣️ "अपनी किताब खोलो"
            </button>
            <button class="btn btn-outline btn-sm" onclick="simulateVoiceInput('water is life', 'English', 'Ho')">
              🗣️ "Water is life"
            </button>
          </div>
        </div>

      </div>
    </div>
  `;
}

function toggleVoiceRecording() {
  const btn = document.getElementById('voice-mic-main-btn');
  const status = document.getElementById('voice-status-text');
  const srcLang = document.getElementById('voice-source-lang').value;

  if (window.speechService.isListening) {
    window.speechService.stopListening();
    if (btn) btn.classList.remove('listening');
    if (status) status.innerText = 'Stopped listening.';
    return;
  }

  if (btn) btn.classList.add('listening');
  if (status) status.innerText = 'Listening... Speak in standard Hindi or English now.';

  window.speechService.startListening(
    srcLang,
    (interim) => {
      if (status) status.innerText = `Hearing: "${interim}"`;
    },
    (final) => {
      if (btn) btn.classList.remove('listening');
      if (status) status.innerText = 'Processing speech translation...';
      handleVoiceTranscript(final);
    },
    (err) => {
      if (btn) btn.classList.remove('listening');
      if (status) status.innerText = 'Microphone permission or network issue.';
      window.apiService.showToast('Microphone error or permission denied.', 'error');
    }
  );
}

function simulateVoiceInput(text, src, tgt) {
  const srcSelect = document.getElementById('voice-source-lang');
  const tgtSelect = document.getElementById('voice-target-lang');
  if (srcSelect) srcSelect.value = src;
  if (tgtSelect) tgtSelect.value = tgt;
  handleVoiceTranscript(text);
}

async function handleVoiceTranscript(text) {
  voiceSpokenText = text;
  const spokenCard = document.getElementById('voice-spoken-card');
  const spokenTextEl = document.getElementById('voice-spoken-text');
  const resultCard = document.getElementById('voice-result-card');
  const resultNative = document.getElementById('voice-result-native');
  const resultRoman = document.getElementById('voice-result-roman');
  const targetLabel = document.getElementById('voice-target-label');
  const status = document.getElementById('voice-status-text');

  if (spokenCard) spokenCard.style.display = 'block';
  if (spokenTextEl) spokenTextEl.innerText = text;

  const srcLang = document.getElementById('voice-source-lang').value;
  const tgtLang = document.getElementById('voice-target-lang').value;
  if (targetLabel) targetLabel.innerText = tgtLang;

  try {
    const res = await window.apiService.post('/translate', {
      text,
      sourceLang: srcLang,
      targetLang: tgtLang,
      scriptMode: 'native'
    });

    if (res.success) {
      voiceTranslatedData = res;
      if (resultCard) resultCard.style.display = 'block';
      if (resultNative) resultNative.innerText = res.nativeScriptText || res.translatedText;
      if (resultRoman) resultRoman.innerText = `Roman: ${res.translatedText}`;
      if (status) status.innerText = '✅ Translated & reading aloud to child...';

      // Auto-speak result
      window.speechService.speak(res.translatedText);
      window.apiService.showToast(`Translated & played in ${tgtLang}`, 'success');
    } else {
      if (status) status.innerText = res.message;
      window.apiService.showToast(res.message, 'info');
    }
  } catch (e) {
    if (status) status.innerText = 'Translation service error.';
  }
}

function speakVoiceResult() {
  if (voiceTranslatedData && voiceTranslatedData.translatedText) {
    window.speechService.speak(voiceTranslatedData.translatedText);
  }
}