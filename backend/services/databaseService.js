const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '../../data/db.json');
const SEED_FILE = path.join(__dirname, '../../data/seedData.json');

class DatabaseService {
  constructor() {
    this.data = {
      users: [],
      lessons: [],
      quizzes: [],
      quizResponses: [],
      translationsHistory: [],
      ocrPresets: [],
      settings: {
        offlineMode: false,
        activeProvider: 'demo',
        highContrast: false,
        defaultSourceLang: 'Hindi',
        defaultTargetLang: 'Santhali',
        speechSpeed: 1.0
      }
    };
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        this.data = JSON.parse(raw);
        console.log('[Database] Loaded existing database from disk');
      } else if (fs.existsSync(SEED_FILE)) {
        const seedRaw = fs.readFileSync(SEED_FILE, 'utf8');
        const seed = JSON.parse(seedRaw);
        this.data = { ...this.data, ...seed };
        this.save();
        console.log('[Database] Initialized database with seed data');
      } else {
        this.save();
        console.log('[Database] Initialized empty database');
      }
    } catch (err) {
      console.error('[Database] Error initializing database:', err);
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.error('[Database] Failed to write database to disk:', err);
    }
  }

  // Users
  findUserByEmail(email) {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserByUsername(username) {
    return this.data.users.find(u => u.username.toLowerCase() === username.toLowerCase());
  }

  findUserById(id) {
    return this.data.users.find(u => u.id === id);
  }

  createUser(user) {
    const newUser = {
      id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      createdAt: new Date().toISOString(),
      ...user
    };
    this.data.users.push(newUser);
    this.save();
    return newUser;
  }

  // Lessons
  getLessons(filters = {}) {
    let list = [...this.data.lessons];
    if (filters.subject) {
      list = list.filter(l => l.subject.toLowerCase() === filters.subject.toLowerCase());
    }
    if (filters.targetLanguage) {
      list = list.filter(l => l.targetLanguage.toLowerCase() === filters.targetLanguage.toLowerCase());
    }
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  createLesson(lesson) {
    const newLesson = {
      id: 'les_' + Date.now(),
      createdAt: new Date().toISOString(),
      ...lesson
    };
    this.data.lessons.unshift(newLesson);
    this.save();
    return newLesson;
  }

  // Quizzes
  getQuizzes(filters = {}) {
    let list = [...this.data.quizzes];
    if (filters.language) {
      list = list.filter(q => q.language.toLowerCase() === filters.language.toLowerCase());
    }
    if (filters.difficulty) {
      list = list.filter(q => q.difficulty.toLowerCase() === filters.difficulty.toLowerCase());
    }
    return list;
  }

  getQuizById(id) {
    return this.data.quizzes.find(q => q.id === id);
  }

  createQuiz(quiz) {
    const newQuiz = {
      id: 'q_' + Date.now(),
      createdAt: new Date().toISOString(),
      ...quiz
    };
    this.data.quizzes.unshift(newQuiz);
    this.save();
    return newQuiz;
  }

  // Quiz Responses
  recordQuizResponse(response) {
    const newResponse = {
      id: 'resp_' + Date.now(),
      timestamp: new Date().toISOString(),
      ...response
    };
    this.data.quizResponses.unshift(newResponse);
    this.save();
    return newResponse;
  }

  getQuizResponses(filters = {}) {
    let list = [...this.data.quizResponses];
    if (filters.studentId) {
      list = list.filter(r => r.studentId === filters.studentId);
    }
    if (filters.quizId) {
      list = list.filter(r => r.quizId === filters.quizId);
    }
    return list;
  }

  // Translation History
  addTranslationHistory(item) {
    const historyItem = {
      id: 'tx_' + Date.now(),
      timestamp: new Date().toISOString(),
      ...item
    };
    this.data.translationsHistory.unshift(historyItem);
    // Keep last 100
    if (this.data.translationsHistory.length > 100) {
      this.data.translationsHistory = this.data.translationsHistory.slice(0, 100);
    }
    this.save();
    return historyItem;
  }

  getTranslationHistory(userId) {
    if (userId) {
      return this.data.translationsHistory.filter(t => t.userId === userId || !t.userId);
    }
    return this.data.translationsHistory;
  }

  deleteTranslationHistoryItem(id) {
    const idx = this.data.translationsHistory.findIndex(t => t.id === id);
    if (idx !== -1) {
      this.data.translationsHistory.splice(idx, 1);
      this.save();
      return true;
    }
    return false;
  }

  clearTranslationHistory(userId) {
    if (userId) {
      this.data.translationsHistory = this.data.translationsHistory.filter(t => t.userId !== userId);
    } else {
      this.data.translationsHistory = [];
    }
    this.save();
    return true;
  }

  // OCR Presets
  getOcrPresets() {
    return this.data.ocrPresets || [];
  }

  // Settings
  getSettings() {
    return this.data.settings;
  }

  updateSettings(newSettings) {
    this.data.settings = { ...this.data.settings, ...newSettings };
    this.save();
    return this.data.settings;
  }
}

module.exports = new DatabaseService();