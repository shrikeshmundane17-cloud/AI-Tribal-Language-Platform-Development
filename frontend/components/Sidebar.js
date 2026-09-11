// BHASHA SETU - SIDEBAR COMPONENT
function renderSidebar(activeRoute) {
  const user = window.authService.getUser();
  const role = window.authService.getRole();

  let navItems = [];

  if (role === 'teacher') {
    navItems = [
      { section: 'Dashboard' },
      { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
      { section: 'Translation & Voice' },
      { id: 'translate', label: 'Text Translator', icon: '🔤' },
      { id: 'voice', label: 'Voice Translator', icon: '🎤' },
      { id: 'ocr', label: 'OCR Scanner', icon: '📷' },
      { id: 'tts', label: 'Text-to-Speech', icon: '🔊' },
      { section: 'Pedagogy' },
      { id: 'quiz', label: 'Create Quiz', icon: '📝' },
      { id: 'responses', label: 'Student Responses', icon: '📊' },
      { id: 'lessons', label: 'Lessons', icon: '📚' },
      { section: 'Resources & System' },
      { id: 'history', label: 'Translation History', icon: '🕒' },
      { id: 'languages', label: 'Tribal Directory', icon: '🌿' },
      { id: 'profile', label: 'Profile', icon: '👤' },
      { id: 'settings', label: 'Settings', icon: '⚙️' }
    ];
  } else if (role === 'student') {
    navItems = [
      { section: 'My Learning' },
      { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
      { id: 'lessons', label: 'Listen & Learn', icon: '🎧' },
      { id: 'quiz', label: 'Quiz', icon: '📝' },
      { section: 'Tools' },
      { id: 'translate', label: 'Translate', icon: '🔤' },
      { id: 'voice', label: 'Voice Translator', icon: '🎤' },
      { id: 'ocr', label: 'OCR Scanner', icon: '📷' },
      { id: 'tts', label: 'Speak Translation', icon: '🔊' },
      { section: 'History & More' },
      { id: 'history', label: 'History', icon: '📅' },
      { id: 'languages', label: 'Tribal Languages', icon: '🌿' },
      { id: 'profile', label: 'Profile', icon: '👤' },
      { id: 'settings', label: 'Settings', icon: '⚙️' }
    ];
  } else {
    // Public / Community
    navItems = [
      { section: 'Explore' },
      { id: 'landing', label: 'Home', icon: '🏠' },
      { id: 'translate', label: 'Text Translator', icon: '🔤' },
      { id: 'voice', label: 'Voice Translator', icon: '🎤' },
      { id: 'ocr', label: 'OCR Scanner', icon: '📷' },
      { id: 'tts', label: 'Text-to-Speech', icon: '🔊' },
      { id: 'lessons', label: 'Sample Lessons', icon: '📚' },
      { id: 'quiz', label: 'Take Quiz', icon: '📝' },
      { id: 'languages', label: 'Tribal Directory', icon: '🌿' },
      { id: 'history', label: 'History', icon: '🕒' },
      { id: 'login', label: 'Login / Sign Up', icon: '🔑' },
      { id: 'settings', label: 'Settings', icon: '⚙️' }
    ];
  }

  let html = `<aside class="sidebar"><nav class="sidebar-nav">`;

  navItems.forEach(item => {
    if (item.section) {
      html += `<div class="nav-section-title">${item.section}</div>`;
    } else {
      const isActive = activeRoute === item.id;
      html += `
        <button class="nav-item ${isActive ? 'active' : ''}" onclick="window.location.hash='#${item.id}'">
          <span class="icon">${item.icon}</span>
          <span>${item.label}</span>
        </button>
      `;
    }
  });

  html += `</nav>`;

  if (user) {
    html += `
      <div class="sidebar-footer">
        <div class="user-profile-badge">
          <div class="user-avatar">${user.name.charAt(0)}</div>
          <div class="user-meta">
            <div class="name">${user.name}</div>
            <div class="role-pill">${role}</div>
          </div>
        </div>
      </div>
    `;
  }

  html += `</aside>`;
  return html;
}