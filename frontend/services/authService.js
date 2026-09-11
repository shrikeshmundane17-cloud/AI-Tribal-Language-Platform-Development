// BHASHA SETU - AUTHENTICATION SERVICE
class AuthService {
  constructor() {
    this.currentUser = null;
    this.loadSession();
  }

  loadSession() {
    const userStr = localStorage.getItem('bhasha_user');
    if (userStr) {
      try {
        this.currentUser = JSON.parse(userStr);
      } catch (e) {
        this.currentUser = null;
      }
    }
  }

  setSession(user, token) {
    this.currentUser = user;
    localStorage.setItem('bhasha_user', JSON.stringify(user));
    localStorage.setItem('bhasha_token', token);
    window.dispatchEvent(new CustomEvent('auth-changed', { detail: { user } }));
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('bhasha_user');
    localStorage.removeItem('bhasha_token');
    window.dispatchEvent(new CustomEvent('auth-changed', { detail: { user: null } }));
    window.location.hash = '#login';
  }

  isLoggedIn() {
    return !!this.currentUser && !!localStorage.getItem('bhasha_token');
  }

  getUser() {
    return this.currentUser;
  }

  getRole() {
    return this.currentUser ? this.currentUser.role : 'guest';
  }

  async login(username, password, role) {
    const res = await window.apiService.post('/auth/login', { username, password, role });
    if (res.success && res.token) {
      this.setSession(res.user, res.token);
    }
    return res;
  }

  async register(data) {
    const res = await window.apiService.post('/auth/register', data);
    if (res.success && res.token) {
      this.setSession(res.user, res.token);
    }
    return res;
  }

  async googleLogin(role) {
    const res = await window.apiService.post('/auth/google', { role });
    if (res.success && res.token) {
      this.setSession(res.user, res.token);
    }
    return res;
  }
}

window.authService = new AuthService();