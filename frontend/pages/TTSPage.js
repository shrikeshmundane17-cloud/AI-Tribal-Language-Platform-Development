// BHASHA SETU - TEXT-TO-SPEECH STUDIO PAGE
let currentSpeedValue = 1.0;

function renderTTSPage() {
  return `
    <div style="max-width: 750px; margin: 0 auto;">
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 26px; font-weight: 800;">Speed-Controlled Text-to-Speech Studio</h1>
        <p style="color: var(--text-muted); font-size: 14px; margin-top: 4px;">
          Phonetic pronunciation engine for tribal vocabulary with variable speed control for primary learners
        </p>
      </div>

      <div class="card" style="padding: 28px;">
        
        <!-- LANGUAGE SELECTOR -->
        <div class="form-group">
          <label class="form-label">Select Tribal Language</label>
          <select id="tts-language-select" class="form-select" style="font-weight: 700; color: var(--primary);">
            <option value="Santhali" selected>🌿 Santhali (Santali)</option>
            <option value="Mundari">🌄 Mundari</option>
            <option value="Ho">𑢹 Ho</option>
            <option value="Kharia">🌸 Kharia</option>
            <option value="Kurukh">🌾 Kurukh</option>
          </select>
        </div>

        <!-- TRIBAL TEXT INPUT -->
        <div class="form-group">
          <label class="form-label">Enter Tribal Text or Word</label>
          <textarea id="tts-input-text" class="form-control" placeholder="Enter tribal words here... e.g. 'Johar! Mit bar pe pun more' or 'Dak'" style="font-size: 18px; font-weight: 600; min-height: 100px;">Johar! Mit bar pe pun more</textarea>
        </div>

        <!-- SPEECH SPEED SLIDER -->
        <div style="background: var(--bg-page); padding: 18px; border-radius: var(--radius-md); margin-bottom: 20px; border: 1px solid var(--border);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <label style="font-size: 13px; font-weight: 700;">⚡ Speech Playback Speed:</label>
            <span id="tts-speed-label" style="font-size: 14px; font-weight: 800; color: var(--primary);">1.0x (Normal)</span>
          </div>

          <input 
            type="range" 
            id="tts-speed-slider" 
            min="0.5" 
            max="2.0" 
            step="0.25" 
            value="1.0" 
            style="width: 100%; cursor: pointer;"
            oninput="handleTTSSpeedChange(this.value)">

          <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted); margin-top: 4px;">
            <span>0.5x (Very Slow)</span>
            <span>0.75x (Slow)</span>
            <span>1.0x (Normal)</span>
            <span>1.5x (Fast)</span>
            <span>2.0x (Fastest)</span>
          </div>
        </div>

        <!-- PLAYBACK CONTROLS -->
        <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 24px;">
          <button class="btn btn-primary" onclick="playTTS()" style="flex: 2; padding: 12px;">
            ▶ Play Audio
          </button>
          <button class="btn btn-outline" onclick="pauseTTS()" style="flex: 1;">
            ⏸ Pause
          </button>
          <button class="btn btn-outline" onclick="resumeTTS()" style="flex: 1;">
            ⏯ Resume
          </button>
          <button class="btn btn-outline" onclick="stopTTS()" style="flex: 1;">
            ⏹ Stop
          </button>
          <button class="btn btn-secondary" onclick="playTTS()" style="flex: 1;">
            🔁 Repeat
          </button>
        </div>

        <!-- SAMPLE VOCABULARY CHIPS -->
        <div style="border-top: 1px dashed var(--border); padding-top: 18px;">
          <div style="font-size: 12px; font-weight: 700; color: var(--text-muted); margin-bottom: 8px;">
            🔊 Quick Test Sample Words:
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn btn-outline btn-sm" onclick="setTTSText('Johar')">Johar (Hello)</button>
            <button class="btn btn-outline btn-sm" onclick="setTTSText('Dak')">Dak (Water)</button>
            <button class="btn btn-outline btn-sm" onclick="setTTSText('Guru')">Guru (Teacher)</button>
            <button class="btn btn-outline btn-sm" onclick="setTTSText('Puthi')">Puthi (Book)</button>
            <button class="btn btn-outline btn-sm" onclick="setTTSText('Iskul')">Iskul (School)</button>
            <button class="btn btn-outline btn-sm" onclick="setTTSText('Mit, Bar, Pe, Pun, More')">Mit Bar Pe (1, 2, 3)</button>
            <button class="btn btn-outline btn-sm" onclick="setTTSText('Ayo ar Aba')">Ayo ar Aba (Parents)</button>
            <button class="btn btn-outline btn-sm" onclick="setTTSText('Dare')">Dare (Tree)</button>
          </div>
        </div>

      </div>
    </div>
  `;
}

function handleTTSSpeedChange(val) {
  currentSpeedValue = parseFloat(val);
  window.speechService.setSpeed(currentSpeedValue);
  const label = document.getElementById('tts-speed-label');
  if (label) {
    const desc = currentSpeedValue <= 0.5 ? '(Very Slow)' : currentSpeedValue < 1.0 ? '(Slow)' : currentSpeedValue === 1.0 ? '(Normal)' : '(Fast)';
    label.innerText = `${currentSpeedValue.toFixed(2)}x ${desc}`;
  }
}

function setTTSText(text) {
  const input = document.getElementById('tts-input-text');
  if (input) input.value = text;
  playTTS();
}

function playTTS() {
  const input = document.getElementById('tts-input-text');
  if (!input || !input.value.trim()) {
    window.apiService.showToast('Please enter text to speak.', 'info');
    return;
  }
  window.speechService.setSpeed(currentSpeedValue);
  window.speechService.speak(input.value.trim());
}

function pauseTTS() {
  window.speechService.pause();
}

function resumeTTS() {
  window.speechService.resume();
}

function stopTTS() {
  window.speechService.stop();
}