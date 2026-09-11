// BHASHA SETU - LESSONS PAGE
let activeSubjectFilter = 'All';

async function renderLessonsPage() {
  const user = window.authService.getUser();
  const role = window.authService.getRole();

  let lessons = [];
  try {
    const res = await window.apiService.get('/lessons');
    if (res.success) lessons = res.lessons;
  } catch (e) {
    console.warn(e);
  }

  const subjects = ['All', 'General Knowledge', 'Environmental Studies', 'Mathematics', 'Science'];
  const filtered = activeSubjectFilter === 'All' 
    ? lessons 
    : lessons.filter(l => l.subject.toLowerCase() === activeSubjectFilter.toLowerCase());

  return `
    <div>
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 26px; font-weight: 800;">Bilingual Curriculum Lessons</h1>
          <p style="color: var(--text-muted); font-size: 14px; margin-top: 4px;">
            Structured JCERT primary school teaching material in tribal vernaculars
          </p>
        </div>

        ${role === 'teacher' ? `
          <button class="btn btn-primary" onclick="openCreateLessonModal()">
            ➕ Create New Lesson
          </button>
        ` : ''}
      </div>

      <!-- SUBJECT FILTER TABS -->
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px;">
        ${subjects.map(s => `
          <button 
            class="btn btn-sm ${activeSubjectFilter === s ? 'btn-primary' : 'btn-outline'}"
            onclick="setSubjectFilter('${s}')">
            ${s}
          </button>
        `).join('')}
      </div>

      <!-- LESSONS CARDS GRID -->
      <div class="grid grid-2">
        ${filtered.map(l => `
          <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <h3 style="font-size: 18px; font-weight: 700;">${l.title}</h3>
                <span class="badge badge-primary">${l.targetLanguage}</span>
              </div>
              
              <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">
                Subject: <strong>${l.subject}</strong> · By: ${l.teacherName || 'Teacher'}
              </div>

              <div style="background: var(--bg-page); padding: 12px; border-radius: var(--radius-md); font-size: 13px; margin-bottom: 10px; border-left: 3px solid var(--border);">
                <strong>Original (${l.sourceLanguage || 'Hindi'}):</strong><br>
                ${l.contentOriginal}
              </div>

              <div style="background: var(--primary-bg); padding: 12px; border-radius: var(--radius-md); font-size: 14px; font-weight: 700; color: var(--primary); margin-bottom: 14px; border-left: 3px solid var(--primary);">
                <strong>Tribal Translation (${l.targetLanguage}):</strong><br>
                ${l.contentTranslated || l.contentOriginal}
              </div>
            </div>

            <div style="display: flex; gap: 8px;">
              <button class="btn btn-accent btn-sm" style="flex: 1;" onclick="window.speechService.speak('${(l.contentTranslated || l.contentOriginal).replace(/'/g, "\\'")}')">
                🔊 Speak Lesson
              </button>
              <button class="btn btn-outline btn-sm" onclick="navigator.clipboard.writeText('${(l.contentTranslated || l.contentOriginal).replace(/'/g, "\\'")}')">
                📋 Copy
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function setSubjectFilter(s) {
  activeSubjectFilter = s;
  const appContent = document.getElementById('app-content');
  renderLessonsPage().then(html => {
    if (appContent) appContent.innerHTML = html;
  });
}

function openCreateLessonModal() {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="closeModal(event)">
      <div class="modal-content" onclick="event.stopPropagation()">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h2 style="font-size: 20px; font-weight: 800;">Create Bilingual Lesson</h2>
          <button style="background: none; border: none; font-size: 20px; cursor: pointer;" onclick="closeModalDirect()">✕</button>
        </div>

        <form onsubmit="handleCreateLessonSubmit(event)">
          <div class="form-group">
            <label class="form-label">Lesson Title</label>
            <input type="text" id="lesson-title" class="form-control" placeholder="e.g. Forest Plants and Animals" required>
          </div>

          <div class="grid grid-2">
            <div class="form-group">
              <label class="form-label">Subject</label>
              <select id="lesson-subject" class="form-select">
                <option value="General Knowledge">General Knowledge</option>
                <option value="Science">Science</option>
                <option value="Environmental Studies" selected>Environmental Studies</option>
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Target Tribal Language</label>
              <select id="lesson-target-lang" class="form-select" style="font-weight: 700; color: var(--primary);">
                <option value="Santhali">🌿 Santhali</option>
                <option value="Mundari">🌄 Mundari</option>
                <option value="Ho">𑢹 Ho</option>
                <option value="Kharia">🌸 Kharia</option>
                <option value="Kurukh">🌾 Kurukh</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Original Lesson Text (Hindi/English)</label>
            <textarea id="lesson-content-orig" class="form-control" placeholder="Enter lesson content in standard language..." required></textarea>
          </div>

          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <label class="form-label" style="margin-bottom: 0;">Tribal Translation</label>
              <button type="button" class="btn btn-outline btn-sm" onclick="autoTranslateLessonInput()" style="font-size: 11px;">
                ⚡ Auto-Translate
              </button>
            </div>
            <textarea id="lesson-content-trans" class="form-control" placeholder="Tribal translation will be generated here or you can enter custom translation..."></textarea>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
            <button type="button" class="btn btn-outline" onclick="closeModalDirect()">Cancel</button>
            <button type="submit" class="btn btn-primary">💾 Save Lesson</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

async function autoTranslateLessonInput() {
  const orig = document.getElementById('lesson-content-orig');
  const trans = document.getElementById('lesson-content-trans');
  const target = document.getElementById('lesson-target-lang');

  if (!orig || !orig.value.trim()) {
    window.apiService.showToast('Please enter original lesson content first.', 'info');
    return;
  }

  try {
    const res = await window.apiService.post('/translate', {
      text: orig.value.trim(),
      targetLang: target ? target.value : 'Santhali'
    });
    if (res.success && trans) {
      trans.value = res.nativeScriptText || res.translatedText;
      window.apiService.showToast('Translation generated!', 'success');
    }
  } catch (e) {
    window.apiService.showToast('Auto-translate failed', 'error');
  }
}

async function handleCreateLessonSubmit(e) {
  e.preventDefault();
  const title = document.getElementById('lesson-title').value;
  const subject = document.getElementById('lesson-subject').value;
  const targetLanguage = document.getElementById('lesson-target-lang').value;
  const contentOriginal = document.getElementById('lesson-content-orig').value;
  const contentTranslated = document.getElementById('lesson-content-trans').value;

  try {
    const res = await window.apiService.post('/lessons', {
      title,
      subject,
      targetLanguage,
      contentOriginal,
      contentTranslated
    });

    if (res.success) {
      window.apiService.showToast('Lesson saved successfully!', 'success');
      closeModalDirect();
      const appContent = document.getElementById('app-content');
      renderLessonsPage().then(html => {
        if (appContent) appContent.innerHTML = html;
      });
    }
  } catch (err) {
    window.apiService.showToast(err.message || 'Failed to save lesson', 'error');
  }
}

function closeModal(e) {
  if (e.target.classList.contains('modal-overlay')) {
    closeModalDirect();
  }
}

function closeModalDirect() {
  const container = document.getElementById('modal-container');
  if (container) container.innerHTML = '';
}