// BHASHA SETU - NAVBAR COMPONENT
function renderNavbar() {
  const user = window.authService.getUser();
  const role = window.authService.getRole();

  return `
    <header class="navbar">
      <div style="display: flex; align-items: center; gap: 14px;">
        <button class="menu-toggle" onclick="toggleSidebar()" aria-label="Toggle navigation">☰</button>
        <a href="#landing" class="nav-brand">
          <div class="nav-logo-icon">🌉</div>
          <div>
            <div style="font-size: 19px; line-height: 1;">Bhasha Setu</div>
            <div style="font-size: 11px; color: var(--text-muted); font-weight: 500;">भाषा सेतु · AI Tribal Platform</div>
          </div>
        </a>
      </div>

      <div class="nav-actions">
        <!-- Status Indicator Pill -->
        <div class="status-pill demo" id="nav-status-pill" title="Current Translation Mode">
          <span class="indicator-dot"></span>
          <span id="nav-status-text">Demo / Local Mode</span>
        </div>

        <!-- High Contrast Mode Toggle -->
        <button class="btn btn-outline btn-sm" onclick="toggleHighContrast()" title="Toggle High Contrast Mode" style="padding: 6px 10px;">
          👁️ <span class="hide-mobile">Contrast</span>
        </button>

        ${user ? `
          <a href="#profile" class="btn btn-outline btn-sm" style="display: flex; align-items: center; gap: 8px;">
            <span>${role === 'teacher' ? '🏫' : role === 'student' ? '🧑‍🎓' : '👤'}</span>
            <span style="font-weight: 700;">${user.name.split(' ')[0]}</span>
            <span class="badge ${role === 'teacher' ? 'badge-primary' : 'badge-secondary'}" style="font-size: 10px;">${role}</span>
          </a>
          <button class="btn btn-outline btn-sm" onclick="window.authService.logout()" title="Logout" style="color: var(--danger);">
            🚪 <span class="hide-mobile">Logout</span>
          </button>
        ` : `
          <a href="#translate" class="btn btn-primary btn-sm">🔤 Translate</a>
          <a href="#login" class="btn btn-outline btn-sm">🔑 Login</a>
        `}
      </div>
    </header>
  `;
}

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.classList.toggle('open');
}

function toggleHighContrast() {
  document.body.classList.toggle('high-contrast');
  const isHc = document.body.classList.contains('high-contrast');
  localStorage.setItem('bhasha_contrast', isHc ? 'true' : 'false');
  window.apiService.showToast(isHc ? 'High Contrast Mode Enabled' : 'Normal Display Restored', 'info');
}