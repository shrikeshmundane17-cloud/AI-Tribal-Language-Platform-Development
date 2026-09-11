// BHASHA SETU - MASTER APPLICATION ROUTER & CONTROLLER

function getActiveRoute() {
  const hash = window.location.hash.replace('#', '') || 'landing';
  return hash.split('?')[0];
}

async function navigate() {
  let route = getActiveRoute();
  const user = window.authService.getUser();
  const role = window.authService.getRole();

  // Role routing for generic #dashboard
  if (route === 'dashboard') {
    if (role === 'student') {
      route = 'student-dashboard';
    } else if (role === 'teacher') {
      route = 'teacher-dashboard';
    } else {
      route = 'landing';
    }
  }

  // Teacher-only route guard
  if (route === 'responses' && role !== 'teacher') {
    window.apiService.showToast('Access restricted to teachers.', 'error');
    window.location.hash = '#login';
    return;
  }

  // Render Layout Shell
  const navbarMount = document.getElementById('navbar-mount');
  const sidebarMount = document.getElementById('sidebar-mount');
  const contentMount = document.getElementById('app-content');

  if (navbarMount) navbarMount.innerHTML = renderNavbar();
  if (sidebarMount) sidebarMount.innerHTML = renderSidebar(route.replace('-dashboard', ''));

  // Render Page Content
  if (contentMount) {
    switch (route) {
      case 'landing':
        contentMount.innerHTML = renderLandingPage();
        break;
      case 'login':
        contentMount.innerHTML = renderLoginPage();
        break;
      case 'teacher-dashboard':
        contentMount.innerHTML = await renderTeacherDashboard();
        break;
      case 'student-dashboard':
        contentMount.innerHTML = renderStudentDashboard();
        break;
      case 'translate':
        contentMount.innerHTML = renderTextTranslatorPage();
        break;
      case 'voice':
        contentMount.innerHTML = renderVoiceTranslatorPage();
        break;
      case 'ocr':
        contentMount.innerHTML = await renderOCRPage();
        break;
      case 'tts':
        contentMount.innerHTML = renderTTSPage();
        break;
      case 'lessons':
        contentMount.innerHTML = await renderLessonsPage();
        break;
      case 'quiz':
        contentMount.innerHTML = await renderQuizPage();
        break;
      case 'responses':
        contentMount.innerHTML = await renderStudentResponsesPage();
        break;
      case 'history':
        contentMount.innerHTML = await renderHistoryPage();
        break;
      case 'languages':
        contentMount.innerHTML = renderLanguagesDirectoryPage();
        break;
      case 'settings':
        contentMount.innerHTML = await renderSettingsPage();
        break;
      case 'profile':
        contentMount.innerHTML = renderProfilePage();
        break;
      default:
        contentMount.innerHTML = renderLandingPage();
        break;
    }
  }

  // Close mobile sidebar on navigation
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.classList.remove('open');

  // Scroll to top
  window.scrollTo(0, 0);
}

// App Initialization
window.addEventListener('DOMContentLoaded', () => {
  // Check High Contrast preference
  if (localStorage.getItem('bhasha_contrast') === 'true') {
    document.body.classList.add('high-contrast');
  }

  // Listen for hashchange
  window.addEventListener('hashchange', navigate);

  // Listen for auth-changed event
  window.addEventListener('auth-changed', () => {
    navigate();
  });

  // Default route if empty
  if (!window.location.hash) {
    window.location.hash = '#landing';
  } else {
    navigate();
  }
});