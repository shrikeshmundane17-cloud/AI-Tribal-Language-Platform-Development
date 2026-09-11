// BHASHA SETU - TEACHER DASHBOARD
async function renderTeacherDashboard() {
  const user = window.authService.getUser();
  let statusData = { totalTranslations: 12, totalLessons: 4, totalQuizzes: 5, totalResponses: 2 };

  try {
    const res = await window.apiService.get('/config/status');
    if (res.success) statusData = res;
  } catch (e) {
    console.warn('Status fetch error:', e);
  }

  return `
    <div style="margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px;">
        <div>
          <h1 style="font-size: 26px; font-weight: 800;">Teacher Portal</h1>
          <p style="color: var(--text-muted); font-size: 14px; margin-top: 4px;">
            Shikshak Dashboard · Welcome, ${user ? user.name : 'Teacher'} (${user ? user.school : 'Model Primary School, Dumka'})
          </p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="btn btn-primary btn-sm" onclick="window.location.hash='#translate'">
            🔤 New Translation
          </button>
          <button class="btn btn-secondary btn-sm" onclick="window.location.hash='#quiz'">
            ➕ Create Quiz
          </button>
        </div>
      </div>
    </div>

    <!-- METRICS CARDS -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon" style="background: var(--primary-bg); color: var(--primary);">🔤</div>
        <div class="stat-info">
          <div class="stat-value">${statusData.totalTranslations || 0}</div>
          <div class="stat-label">Total Translations</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: var(--secondary-bg); color: var(--secondary);">🧑‍🎓</div>
        <div class="stat-info">
          <div class="stat-value">28</div>
          <div class="stat-label">Class 1–5 Students</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: var(--accent-bg); color: var(--accent);">📚</div>
        <div class="stat-info">
          <div class="stat-value">${statusData.totalLessons || 0}</div>
          <div class="stat-label">Saved Lessons</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: var(--purple-bg); color: var(--purple);">📝</div>
        <div class="stat-info">
          <div class="stat-value">${statusData.totalQuizzes || 0}</div>
          <div class="stat-label">Active Quizzes</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: var(--teal-bg); color: var(--teal);">🌿</div>
        <div class="stat-info">
          <div class="stat-value">5</div>
          <div class="stat-label">Tribal Languages</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: #E8F5E9; color: var(--primary);">📵</div>
        <div class="stat-info">
          <div class="stat-value" style="font-size: 16px; color: var(--primary); font-weight: 700;">Demo / Offline</div>
          <div class="stat-label">Engine Ready</div>
        </div>
      </div>
    </div>

    <!-- TEACHER PRIMARY TOOLS -->
    <div style="margin-bottom: 32px;">
      <h2 style="font-size: 18px; margin-bottom: 16px;">Primary Bilingual Teaching Tools</h2>
      
      <div class="action-grid">
        <div class="action-tile" onclick="window.location.hash='#translate'">
          <div class="tile-icon" style="color: var(--primary);">🔤</div>
          <h3>Text Translator</h3>
          <p>Translate textbook passages from Hindi/English into Santhali, Mundari, Ho, Kharia, or Kurukh.</p>
        </div>

        <div class="action-tile" onclick="window.location.hash='#voice'">
          <div class="tile-icon" style="color: var(--accent);">🎤</div>
          <h3>Live Teacher Mic</h3>
          <p>Speak lesson instructions in standard Hindi; system instantly speaks back in tribal mother tongue.</p>
        </div>

        <div class="action-tile" onclick="window.location.hash='#ocr'">
          <div class="tile-icon" style="color: var(--teal);">📷</div>
          <h3>Scan Textbook (OCR)</h3>
          <p>Scan JCERT textbook pages with your camera, extract text, and generate bilingual worksheets.</p>
        </div>

        <div class="action-tile" onclick="window.location.hash='#tts'">
          <div class="tile-icon" style="color: var(--purple);">🔊</div>
          <h3>Text-to-Speech Studio</h3>
          <p>Speed-controlled speech generator for Ol Chiki and tribal words with slow playback for early learners.</p>
        </div>

        <div class="action-tile" onclick="window.location.hash='#quiz'">
          <div class="tile-icon" style="color: var(--secondary);">📝</div>
          <h3>Create Quiz</h3>
          <p>Design vocabulary and concept quizzes in tribal languages with text or voice answers.</p>
        </div>

        <div class="action-tile" onclick="window.location.hash='#responses'">
          <div class="tile-icon" style="color: var(--danger);">📊</div>
          <h3>Student Responses</h3>
          <p>Review student quiz answers, voice assessment scores, and track classroom engagement.</p>
        </div>
      </div>
    </div>

    <!-- RECENT TRANSLATIONS WIDGET -->
    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h3 style="font-size: 17px;">Recent Lesson Translations</h3>
        <a href="#history" style="font-size: 13px; font-weight: 700;">View All History →</a>
      </div>
      <div id="teacher-recent-translations">
        <div style="font-size: 13px; color: var(--text-muted); padding: 12px 0;">Loading recent translations...</div>
      </div>
    </div>
  `;
}

// Load recent items after DOM update
setTimeout(async () => {
  const el = document.getElementById('teacher-recent-translations');
  if (!el) return;
  try {
    const res = await window.apiService.get('/history');
    const items = (res.history || []).slice(0, 3);
    if (!items.length) {
      el.innerHTML = '<div style="font-size: 13px; color: var(--text-muted);">No recent translations recorded yet.</div>';
      return;
    }
    el.innerHTML = items.map(t => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px solid var(--border); gap: 12px;">
        <div style="flex: 1;">
          <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 4px;">
            <span class="badge badge-primary" style="font-size: 10px;">${t.sourceLanguage} → ${t.targetLanguage}</span>
            <span style="font-size: 11px; color: var(--text-muted);">${new Date(t.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div style="font-size: 13px; color: var(--text-muted);">${t.sourceText}</div>
          <div style="font-size: 15px; font-weight: 700; color: var(--text-main); margin-top: 2px;">
            ${t.nativeScriptText || t.translatedText}
          </div>
        </div>
        <button class="btn btn-outline btn-sm" onclick="window.speechService.speak('${t.translatedText}')">🔊 Speak</button>
      </div>
    `).join('');
  } catch (e) {
    el.innerHTML = '<div style="font-size: 13px; color: var(--text-muted);">Could not load history.</div>';
  }
}, 300);