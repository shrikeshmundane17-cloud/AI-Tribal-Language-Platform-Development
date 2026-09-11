// BHASHA SETU - SETTINGS & DEVELOPER CONFIGURATION
async function renderSettingsPage() {
  let settings = {
    activeProvider: 'demo',
    defaultSourceLang: 'Hindi',
    defaultTargetLang: 'Santhali',
    speechSpeed: 1.0,
    highContrast: false
  };

  try {
    const res = await window.apiService.get('/config/status');
    if (res.success && res.settings) settings = res.settings;
  } catch (e) {
    console.warn(e);
  }

  return `
    <div style="max-width: 750px; margin: 0 auto;">
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 26px; font-weight: 800;">Platform Settings</h1>
        <p style="color: var(--text-muted); font-size: 14px; margin-top: 4px;">
          Configure language preferences, accessibility, audio speed, and AI translation engine
        </p>
      </div>

      <div class="card" style="padding: 28px; margin-bottom: 24px;">
        <h3 style="font-size: 18px; margin-bottom: 18px;">🌐 Language &amp; Translation Preferences</h3>

        <div class="grid grid-2">
          <div class="form-group">
            <label class="form-label">Default Source Language</label>
            <select id="setting-source-lang" class="form-select">
              <option value="Hindi" ${settings.defaultSourceLang === 'Hindi' ? 'selected' : ''}>Hindi (हिन्दी)</option>
              <option value="English" ${settings.defaultSourceLang === 'English' ? 'selected' : ''}>English</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Default Target Language</label>
            <select id="setting-target-lang" class="form-select" style="color: var(--primary); font-weight: 700;">
              <option value="Santhali" ${settings.defaultTargetLang === 'Santhali' ? 'selected' : ''}>🌿 Santhali (Ol Chiki)</option>
              <option value="Mundari" ${settings.defaultTargetLang === 'Mundari' ? 'selected' : ''}>🌄 Mundari</option>
              <option value="Ho" ${settings.defaultTargetLang === 'Ho' ? 'selected' : ''}>𑢹 Ho (Warang Citi)</option>
              <option value="Kharia" ${settings.defaultTargetLang === 'Kharia' ? 'selected' : ''}>🌸 Kharia</option>
              <option value="Kurukh" ${settings.defaultTargetLang === 'Kurukh' ? 'selected' : ''}>🌾 Kurukh</option>
            </select>
          </div>
        </div>
      </div>

      <!-- ACCESSIBILITY & AUDIO CARD -->
      <div class="card" style="padding: 28px; margin-bottom: 24px;">
        <h3 style="font-size: 18px; margin-bottom: 18px;">🔊 Speech &amp; Accessibility</h3>

        <div class="form-group">
          <label class="form-label">Default Text-to-Speech Speed</label>
          <div style="display: flex; align-items: center; gap: 14px;">
            <input 
              type="range" 
              id="setting-speech-speed" 
              min="0.5" 
              max="2.0" 
              step="0.25" 
              value="${settings.speechSpeed || 1.0}"
              style="flex: 1;"
              oninput="document.getElementById('setting-speed-val').innerText = this.value + 'x'">
            <span id="setting-speed-val" style="font-weight: 700; width: 50px;">${settings.speechSpeed || 1.0}x</span>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-top: 1px solid var(--border);">
          <div>
            <div style="font-weight: 700; font-size: 14px;">High Contrast Mode</div>
            <div style="font-size: 12px; color: var(--text-muted);">Enhance text readability for high daylight outdoor classroom settings</div>
          </div>
          <button class="btn btn-outline btn-sm" onclick="toggleHighContrast()">Toggle Contrast</button>
        </div>
      </div>

      <!-- DEVELOPER & AI PROVIDER CONFIGURATION (SECTION 10 & 35) -->
      <div class="card" style="padding: 28px; margin-bottom: 24px;">
        <h3 style="font-size: 18px; margin-bottom: 8px;">⚙️ Translation Provider Architecture</h3>
        <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 18px;">
          Modular provider adapter. Switch seamlessly between local zero-dependency demo mode and government/open-source translation APIs.
        </p>

        <div class="form-group">
          <label class="form-label">Active Translation Provider</label>
          <select id="setting-active-provider" class="form-select">
            <option value="demo" ${settings.activeProvider === 'demo' ? 'selected' : ''}>DemoProvider (Verified Local Lexicon &amp; Offline Dictionary)</option>
            <option value="bhashini" ${settings.activeProvider === 'bhashini' ? 'selected' : ''}>BhashiniProvider (Digital India ULCA API)</option>
            <option value="ai4bharat" ${settings.activeProvider === 'ai4bharat' ? 'selected' : ''}>AI4BharatProvider (IndicTrans2 Inference Adapter)</option>
          </select>
        </div>

        <div style="background: var(--bg-page); padding: 14px; border-radius: var(--radius-md); font-size: 12px; border: 1px solid var(--border);">
          <div style="font-weight: 700; margin-bottom: 4px;">Provider Status Check:</div>
          <div>🟢 <strong>DemoProvider:</strong> 100% Operational (Local Database Loaded)</div>
          <div>🟡 <strong>BhashiniProvider:</strong> Ready for API Credentials (.env)</div>
          <div>🟡 <strong>AI4BharatProvider:</strong> Adapter Configured</div>
        </div>
      </div>

      <div style="text-align: right;">
        <button class="btn btn-primary btn-lg" onclick="saveSettingsForm()">
          💾 Save Settings
        </button>
      </div>
    </div>
  `;
}

async function saveSettingsForm() {
  const sourceLang = document.getElementById('setting-source-lang').value;
  const targetLang = document.getElementById('setting-target-lang').value;
  const speed = parseFloat(document.getElementById('setting-speech-speed').value);
  const provider = document.getElementById('setting-active-provider').value;

  try {
    const res = await window.apiService.post('/config/settings', {
      defaultSourceLang: sourceLang,
      defaultTargetLang: targetLang,
      speechSpeed: speed,
      activeProvider: provider
    });

    if (res.success) {
      window.speechService.setSpeed(speed);
      
      // Update nav status pill
      const pill = document.getElementById('nav-status-pill');
      const text = document.getElementById('nav-status-text');
      if (pill && text) {
        if (provider === 'demo') {
          pill.className = 'status-pill demo';
          text.innerText = 'Demo / Local Mode';
        } else {
          pill.className = 'status-pill';
          text.innerText = 'Online Translation';
        }
      }

      window.apiService.showToast('Settings saved successfully!', 'success');
    }
  } catch (e) {
    window.apiService.showToast('Failed to save settings', 'error');
  }
}