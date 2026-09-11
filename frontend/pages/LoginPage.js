// BHASHA SETU - AUTHENTICATION PAGE
let selectedAuthRole = 'teacher';
let isRegisterMode = false;

function renderLoginPage() {
  return `
    <div style="max-width: 520px; margin: 40px auto; padding: 0 16px;">
      <div class="card" style="padding: 36px 32px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <div class="nav-logo-icon" style="margin: 0 auto 14px; width: 56px; height: 56px; font-size: 28px;">🌉</div>
          <h2 style="font-size: 24px; font-weight: 800;">${isRegisterMode ? 'Create Account' : 'Welcome to Bhasha Setu'}</h2>
          <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
            ${isRegisterMode ? 'Register to save lessons and track classroom progress' : 'Sign in to access your role-specific dashboard'}
          </p>
        </div>

        <!-- Role Selector Tabs -->
        <div style="display: flex; background: var(--bg-page); padding: 4px; border-radius: var(--radius-md); margin-bottom: 24px; border: 1px solid var(--border);">
          <button 
            type="button" 
            class="btn btn-sm ${selectedAuthRole === 'teacher' ? 'btn-primary' : 'btn-outline'}" 
            style="flex: 1; border: none;" 
            onclick="setAuthRole('teacher')">
            🏫 Teacher
          </button>
          <button 
            type="button" 
            class="btn btn-sm ${selectedAuthRole === 'student' ? 'btn-primary' : 'btn-outline'}" 
            style="flex: 1; border: none;" 
            onclick="setAuthRole('student')">
            🧑‍🎓 Student
          </button>
          <button 
            type="button" 
            class="btn btn-sm ${selectedAuthRole === 'community' ? 'btn-primary' : 'btn-outline'}" 
            style="flex: 1; border: none;" 
            onclick="setAuthRole('community')">
            👤 Community
          </button>
        </div>

        <!-- Login Form -->
        <form id="auth-form" onsubmit="handleAuthSubmit(event)">
          ${isRegisterMode ? `
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" id="auth-name" class="form-control" placeholder="e.g. Rajesh Soren" required>
            </div>
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" id="auth-email" class="form-control" placeholder="name@school.edu.in" required>
            </div>
            <div class="form-group">
              <label class="form-label">School / District</label>
              <input type="text" id="auth-school" class="form-control" placeholder="e.g. Govt Primary School, Dumka">
            </div>
          ` : ''}

          <div class="form-group">
            <label class="form-label">${isRegisterMode ? 'Choose Username' : 'Username or Email'}</label>
            <input type="text" id="auth-username" class="form-control" placeholder="${selectedAuthRole === 'teacher' ? 'teacher1' : selectedAuthRole === 'student' ? 'student1' : 'community1'}" required>
          </div>

          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label class="form-label" style="margin-bottom: 0;">Password</label>
              ${!isRegisterMode ? `<a href="javascript:void(0)" onclick="handleForgotPassword()" style="font-size: 12px;">Forgot Password?</a>` : ''}
            </div>
            <div style="position: relative;">
              <input type="password" id="auth-password" class="form-control" placeholder="Enter password" required style="padding-right: 44px;">
              <button type="button" onclick="togglePasswordVisibility()" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 16px; color: var(--text-muted);" title="Toggle password visibility">👁️</button>
            </div>
          </div>

          ${!isRegisterMode ? `
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 20px;">
              <input type="checkbox" id="remember-me" checked>
              <label for="remember-me" style="font-size: 13px; color: var(--text-muted); cursor: pointer;">Remember this device</label>
            </div>
          ` : ''}

          <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 16px;">
            ${isRegisterMode ? 'Create Account' : `Sign In as ${selectedAuthRole.charAt(0).toUpperCase() + selectedAuthRole.slice(1)}`}
          </button>
        </form>

        <!-- Google Login Divider -->
        <div style="display: flex; align-items: center; gap: 12px; margin: 24px 0 20px;">
          <div style="flex: 1; height: 1px; background: var(--border);"></div>
          <span style="font-size: 12px; color: var(--text-light); text-transform: uppercase; font-weight: 700;">OR</span>
          <div style="flex: 1; height: 1px; background: var(--border);"></div>
        </div>

        <!-- Google OAuth Button -->
        <button type="button" class="btn btn-outline" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px; padding: 11px;" onclick="handleGoogleLogin()">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
          <span style="font-weight: 600;">Continue with Google</span>
        </button>

        <!-- Quick Demo Credentials Box -->
        <div style="margin-top: 24px; padding: 14px; background: var(--bg-page); border-radius: var(--radius-md); border: 1px dashed var(--border); font-size: 12px;">
          <div style="font-weight: 700; color: var(--text-main); margin-bottom: 6px;">⚡ Quick Demo Accounts:</div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button type="button" class="btn btn-outline btn-sm" onclick="fillDemo('teacher1', 'Teacher@123', 'teacher')">
              Fill Teacher (teacher1)
            </button>
            <button type="button" class="btn btn-outline btn-sm" onclick="fillDemo('student1', 'Student@123', 'student')">
              Fill Student (student1)
            </button>
          </div>
        </div>

        <!-- Toggle Register/Login -->
        <div style="text-align: center; margin-top: 20px; font-size: 13px; color: var(--text-muted);">
          ${isRegisterMode ? 'Already have an account?' : "Don't have an account yet?"}
          <a href="javascript:void(0)" onclick="toggleRegisterMode()" style="font-weight: 700; margin-left: 4px;">
            ${isRegisterMode ? 'Sign In' : 'Create Account'}
          </a>
        </div>
      </div>
    </div>
  `;
}

function setAuthRole(role) {
  selectedAuthRole = role;
  const usernameInput = document.getElementById('auth-username');
  if (usernameInput && !isRegisterMode) {
    usernameInput.placeholder = role === 'teacher' ? 'teacher1' : role === 'student' ? 'student1' : 'community1';
  }
  const appContent = document.getElementById('app-content');
  if (appContent) appContent.innerHTML = renderLoginPage();
}

function toggleRegisterMode() {
  isRegisterMode = !isRegisterMode;
  const appContent = document.getElementById('app-content');
  if (appContent) appContent.innerHTML = renderLoginPage();
}

function togglePasswordVisibility() {
  const pwd = document.getElementById('auth-password');
  if (pwd) {
    pwd.type = pwd.type === 'password' ? 'text' : 'password';
  }
}

function fillDemo(username, password, role) {
  selectedAuthRole = role;
  isRegisterMode = false;
  const appContent = document.getElementById('app-content');
  if (appContent) appContent.innerHTML = renderLoginPage();
  
  setTimeout(() => {
    const u = document.getElementById('auth-username');
    const p = document.getElementById('auth-password');
    if (u) u.value = username;
    if (p) p.value = password;
  }, 50);
}

function handleForgotPassword() {
  alert('Password Reset Demo: For this demonstration environment, default passwords are: \n\nTeacher: Teacher@123\nStudent: Student@123\nCommunity: Community@123');
}

async function handleGoogleLogin() {
  try {
    const res = await window.authService.googleLogin(selectedAuthRole);
    if (res.demoMode) {
      window.apiService.showToast(res.warning, 'info');
    }
    window.apiService.showToast('Logged in via Demo Google Login', 'success');
    window.location.hash = selectedAuthRole === 'teacher' ? '#dashboard' : '#dashboard';
  } catch (e) {
    window.apiService.showToast(e.message || 'Google Login failed', 'error');
  }
}

async function handleAuthSubmit(e) {
  e.preventDefault();
  const username = document.getElementById('auth-username').value;
  const password = document.getElementById('auth-password').value;

  try {
    if (isRegisterMode) {
      const name = document.getElementById('auth-name').value;
      const email = document.getElementById('auth-email').value;
      const school = document.getElementById('auth-school').value;
      await window.authService.register({ username, email, password, name, role: selectedAuthRole, school });
      window.apiService.showToast('Registration successful!', 'success');
    } else {
      await window.authService.login(username, password, selectedAuthRole);
      window.apiService.showToast(`Welcome back! Logged in as ${selectedAuthRole}`, 'success');
    }
    window.location.hash = '#dashboard';
  } catch (err) {
    window.apiService.showToast(err.message || 'Authentication error', 'error');
  }
}