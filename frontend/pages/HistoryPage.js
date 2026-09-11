// BHASHA SETU - TRANSLATION HISTORY PAGE
async function renderHistoryPage() {
  let history = [];
  try {
    const res = await window.apiService.get('/history');
    if (res.success) history = res.history || [];
  } catch (e) {
    console.warn(e);
  }

  return `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 26px; font-weight: 800;">Learning &amp; Translation History</h1>
          <p style="color: var(--text-muted); font-size: 14px; margin-top: 4px;">
            Archived classroom translations with native scripts and audio replay
          </p>
        </div>

        ${history.length ? `
          <button class="btn btn-outline btn-sm" onclick="handleClearHistory()" style="color: var(--danger); border-color: var(--danger);">
            🗑️ Clear History
          </button>
        ` : ''}
      </div>

      ${history.length ? `
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${history.map(item => `
            <div class="card" style="padding: 18px 24px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <div style="display: flex; gap: 8px; align-items: center;">
                  <span class="badge badge-primary">${item.sourceLanguage} → ${item.targetLanguage}</span>
                  <span class="badge badge-accent">${item.script || 'Roman'}</span>
                  <span style="font-size: 11px; color: var(--text-muted);">
                    ${new Date(item.timestamp).toLocaleString()}
                  </span>
                </div>
                <button class="btn btn-outline btn-sm" onclick="handleDeleteHistoryItem('${item.id}')" title="Delete record" style="padding: 4px 8px; font-size: 11px;">
                  ✕
                </button>
              </div>

              <div style="font-size: 14px; color: var(--text-muted); margin-bottom: 6px;">
                ${item.sourceText}
              </div>

              <div style="font-size: 20px; font-weight: 800; color: var(--text-main); margin-bottom: 12px;">
                ${item.nativeScriptText || item.translatedText}
              </div>

              <div style="display: flex; gap: 8px;">
                <button class="btn btn-accent btn-sm" onclick="window.speechService.speak('${(item.translatedText || item.sourceText).replace(/'/g, "\\'")}')">
                  🔊 Speak
                </button>
                <button class="btn btn-outline btn-sm" onclick="navigator.clipboard.writeText('${(item.nativeScriptText || item.translatedText).replace(/'/g, "\\'")}')">
                  📋 Copy
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="card" style="text-align: center; padding: 48px 20px;">
          <div style="font-size: 40px; margin-bottom: 10px;">🕒</div>
          <h3 style="font-size: 18px;">No Translations in History</h3>
          <p style="font-size: 13px; color: var(--text-muted); margin: 6px 0 20px;">
            Translations you perform on the Text Translator or Voice Translator will appear here.
          </p>
          <a href="#translate" class="btn btn-primary">Start Translating</a>
        </div>
      `}
    </div>
  `;
}

async function handleDeleteHistoryItem(id) {
  try {
    await window.apiService.delete(`/history/${id}`);
    window.apiService.showToast('Item deleted from history', 'info');
    const appContent = document.getElementById('app-content');
    renderHistoryPage().then(html => {
      if (appContent) appContent.innerHTML = html;
    });
  } catch (e) {
    window.apiService.showToast('Failed to delete item', 'error');
  }
}

async function handleClearHistory() {
  if (!confirm('Are you sure you want to clear your translation history?')) return;
  try {
    await window.apiService.delete('/history');
    window.apiService.showToast('Translation history cleared', 'info');
    const appContent = document.getElementById('app-content');
    renderHistoryPage().then(html => {
      if (appContent) appContent.innerHTML = html;
    });
  } catch (e) {
    window.apiService.showToast('Failed to clear history', 'error');
  }
}