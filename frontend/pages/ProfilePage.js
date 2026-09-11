// BHASHA SETU - USER PROFILE PAGE
function renderProfilePage() {
  const user = window.authService.getUser();
  const role = window.authService.getRole();

  if (!user) {
    return `
      <div class="card" style="max-width: 500px; margin: 40px auto; text-align: center; padding: 40px;">
        <h3>Please Log In</h3>
        <p style="color: var(--text-muted); margin: 8px 0 20px;">You are currently browsing as a guest.</p>
        <a href="#login" class="btn btn-primary">Login Now</a>
      </div>
    `;
  }

  return `
    <div style="max-width: 600px; margin: 0 auto;">
      <div class="card" style="padding: 36px 32px; text-align: center;">
        <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--primary-bg); color: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 36px; margin: 0 auto 16px; font-weight: 800;">
          ${role === 'teacher' ? '🏫' : role === 'student' ? '🧑‍🎓' : '👤'}
        </div>

        <h2 style="font-size: 24px; font-weight: 800;">${user.name}</h2>
        <div style="margin-top: 6px;">
          <span class="badge ${role === 'teacher' ? 'badge-primary' : 'badge-secondary'}" style="font-size: 13px; padding: 6px 16px;">
            ${role.toUpperCase()} ACCOUNT
          </span>
        </div>

        <!-- PROFILE DETAILS -->
        <div style="margin: 28px 0; text-align: left; display: flex; flex-direction: column; gap: 10px;">
          <div style="padding: 12px; background: var(--bg-page); border-radius: var(--radius-md); display: flex; justify-content: space-between; font-size: 13px;">
            <span style="color: var(--text-muted);">Username</span>
            <strong>${user.username}</strong>
          </div>

          <div style="padding: 12px; background: var(--bg-page); border-radius: var(--radius-md); display: flex; justify-content: space-between; font-size: 13px;">
            <span style="color: var(--text-muted);">Email</span>
            <strong>${user.email}</strong>
          </div>

          <div style="padding: 12px; background: var(--bg-page); border-radius: var(--radius-md); display: flex; justify-content: space-between; font-size: 13px;">
            <span style="color: var(--text-muted);">School / Institution</span>
            <strong>${user.school || 'Government Model Primary School'}</strong>
          </div>

          <div style="padding: 12px; background: var(--bg-page); border-radius: var(--radius-md); display: flex; justify-content: space-between; font-size: 13px;">
            <span style="color: var(--text-muted);">Region / State</span>
            <strong>${user.region || 'Jharkhand'}</strong>
          </div>

          <div style="padding: 12px; background: var(--bg-page); border-radius: var(--radius-md); display: flex; justify-content: space-between; font-size: 13px;">
            <span style="color: var(--text-muted);">Security &amp; Session</span>
            <strong style="color: var(--primary);">🔒 bcrypt Hashed · JWT Protected</strong>
          </div>
        </div>

        <button class="btn btn-outline" style="width: 100%; color: var(--danger); border-color: var(--danger); padding: 12px;" onclick="window.authService.logout()">
          🚪 Sign Out
        </button>
      </div>
    </div>
  `;
}