# BHASHA SETU (भाषा सेतु)
### AI-Powered Vernacular Pedagogy & Real-Time Tribal Language Translation Platform
**"Connecting Languages. Empowering Tribal Education."**

*Smart India Hackathon 2026 — Problem Statement ID: SIH2026042*  
*Theme: Smart Education | Category: Software | Team: THUNDERS*

---

## 1. Project Overview

**Bhasha Setu** is an AI-powered vernacular pedagogy and real-time translation platform designed to eliminate the **40%+ early-grade dropout crisis** among first-generation tribal learners in Jharkhand and surrounding states. 

In primary schools across West Singhbhum, Dumka, and Khunti districts, tribal children frequently speak 0% Hindi upon entering Class 1. Non-tribal teachers face a severe communication barrier. In direct alignment with the **National Education Policy (NEP) 2020** (Clauses 4.11 – 4.14) and the Jharkhand State JCERT *'Mera Vidyalaya, Meri Bhasha'* initiative, Bhasha Setu serves as an instant bilingual pedagogical assistant.

The platform provides bidirectional translation between standard Hindi/English and **5 indigenous tribal languages**:
1. **Santhali / Santali** (`sat`) — with authentic **Ol Chiki script (ᱚᱞ ᱪᱤᱠᱤ)**
2. **Mundari** (`unr`) — Devanagari & Roman
3. **Ho** (`hoc`) — with authentic **Warang Citi script (𑢹𑣉𑣉)**
4. **Kharia** (`khr`) — Latin / Devanagari
5. **Kurukh (Oraon)** (`kru`) — Tolong Siki / Devanagari

---

## 2. Core Features

- **Real-Time Runtime Text Translator**: Accepts ANY runtime text input (typed or pasted) and translates into the selected tribal language with Ol Chiki / Warang Citi native script and Roman transliteration.
- **Live Teacher Mic Translation**: Teacher speaks instructions in standard Hindi; the system immediately speaks back in the child's home language.
- **Smart 'Scan & Tell' Textbook OCR**: Point device camera or upload JCERT textbook pages → Extract text → Edit → Translate → Read aloud.
- **Speed-Controlled Text-to-Speech (TTS)**: 0.5x to 2.0x playback speed slider, pause, resume, repeat, and sample word pronunciation tests.
- **Two-Way Voice & Text Quizzing**: Teachers design quizzes; tribal children answer verbally or with text to evaluate conceptual grasp without requiring written literacy.
- **Bilingual Curriculum Lessons**: Teacher-created lesson repository across General Knowledge, Science, Math, and Environmental Studies.
- **Translation History & Favorites**: Searchable session history with repeat playback and one-click copy.
- **Role-Based Authentication**: Distinct portals for Teachers (`teacher1` / `Teacher@123`), Students (`student1` / `Student@123`), and Community users with secure backend bcrypt password hashing and JWT sessions.
- **Safe Google OAuth Architecture**: "Continue with Google" button with development simulation mode and production OAuth client readiness.
- **Tribal Language Directory & Regional Filter**: Interactive state filtering (Jharkhand, Odisha, West Bengal, Chhattisgarh, Assam) with dialect variation disclaimers.
- **Accessibility Suite**: High-contrast mode toggle and flexible responsive layout from mobile to desktop.

---

## 3. System Architecture

```
                          BHASHA SETU PLATFORM
┌────────────────────────────────────────────────────────────────────────┐
│                      MODERN SAAS FRONTEND (SPA)                        │
│  Landing Page · Teacher Dashboard · Student Dashboard · Directory      │
│  Real-Time Translator · Voice Workspace · OCR Scanner · Quiz & Lessons │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / REST APIs
┌───────────────────────────────────▼────────────────────────────────────┐
│                    NODE.JS / EXPRESS.JS BACKEND                        │
│  Controllers · Auth JWT & bcrypt · Transliteration Service             │
│  Modular Translation Engine · Database Layer · OCR Pipeline            │
└───────────────┬───────────────────┬───────────────────┬────────────────┘
                │                   │                   │
      ┌─────────▼────────┐ ┌────────▼─────────┐ ┌───────▼────────┐
      │  DemoProvider    │ │ BhashiniProvider │ │ AI4Bharat      │
      │  (Local Lexicon  │ │ (Govt of India   │ │ IndicTrans2    │
      │   & Translit)    │ │  Ulca API)       │ │ Adapter        │
      └──────────────────┘ └──────────────────┘ └────────────────┘
```

### Modular Provider Pattern
The backend adheres to a pluggable provider interface:
- **`DemoProvider`**: Runs locally with authentic tribal dictionaries and Ol Chiki / Warang Citi script engines. If a sentence is outside the local dictionary, it displays an honest notice: *"Translation unavailable in Demo Mode. Connect an online translation provider."* It **never** invents synthetic or inaccurate translations.
- **`BhashiniProvider`**: Adapter for the Ministry of Electronics and Information Technology (MeitY) Digital India Bhashini ULCA platform.
- **`AI4BharatProvider`**: Adapter for open-source IndicTrans2 inference endpoints.

---

## 4. Technology Stack

- **Frontend**: HTML5, CSS3 Variables (Forest Green `#1B5E20`, Ochre `#E65100`, River Blue `#1565C0`), JavaScript ES6+ (Modular SPA Router), Web Speech API (`SpeechRecognition` & `SpeechSynthesis`).
- **Backend**: Node.js (v18+ / v20+), Express.js, CORS, Dotenv.
- **Security**: `bcryptjs` for server-side password hashing, `jsonwebtoken` (JWT) for session management.
- **Data Layer**: Embedded persistent JSON database service (`data/db.json` with seed fallback in `data/seedData.json`).
- **Scripts**: Unicode Ol Chiki (`U+1C50–U+1C7F`), Warang Citi (`U+118A0–U+118DF`), Devanagari (`U+0900–U+097F`).

---

## 5. Quick Start & Run Commands

### Prerequisites
- Node.js (v18.0.0 or later) & npm

### Installation
```bash
# 1. Navigate to project root
cd C:\Users\USER\.gemini\antigravity\scratch\bhasha-setu

# 2. Install dependencies
npm install

# 3. Start the application
npm start
```

Open your browser and navigate to:
**`http://localhost:5000`**

---

## 6. Demo Login Credentials

For demonstration and evaluation, three pre-seeded accounts are provided:

| Role | Username | Password | Notes |
|---|---|---|---|
| **Teacher** | `teacher1` | `Teacher@123` | Full access to Teacher Dashboard, Create Quiz, Create Lesson, Review Responses |
| **Student** | `student1` | `Student@123` | Child-friendly interface, Listen & Learn, Voice Answer, Play Quiz |
| **Community** | `community1` | `Community@123` | General vernacular translation and dictionary exploration |

*You can also click the "Fill Teacher" or "Fill Student" buttons on the login screen to autofill.*

---

## 7. Environment Variables Configuration

Copy `.env.example` to `.env`:

```env
# SERVER CONFIGURATION
PORT=5000
NODE_ENV=development
JWT_SECRET=bhasha_setu_secret_key_sih_2026_tribal_platform

# TRANSLATION PROVIDER (demo | bhashini | ai4bharat)
TRANSLATION_PROVIDER=demo

# DIGITAL INDIA BHASHINI API (Required only for online Bhashini mode)
BHASHINI_API_KEY=
BHASHINI_USER_ID=
BHASHINI_PIPELINE_ID=

# AI4BHARAT INDICTRANS2 INFERENCE
AI4BHARAT_API_KEY=
AI4BHARAT_ENDPOINT=

# GOOGLE OAUTH 2.0 (Leave blank for Demo Google Login simulation)
GOOGLE_CLIENT_ID=
```

---

## 8. Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project and configure the OAuth consent screen.
3. Create OAuth 2.0 Client IDs (Web application).
4. Add your authorized JavaScript origin: `http://localhost:5000`.
5. Set `GOOGLE_CLIENT_ID` in your `.env` file.
*If `GOOGLE_CLIENT_ID` is left empty, Bhasha Setu automatically enables the safe development mode **Demo Google Login** with an explanatory banner.*

---

## 9. Project Directory Structure

```text
bhasha-setu/
├── frontend/
│   ├── index.html                   # Master SPA shell
│   ├── app.js                       # Client-side router & controller
│   ├── styles/
│   │   ├── main.css                 # Theme variables, accessible typography, cards
│   │   └── dashboard.css            # SaaS grids, translation workspace, quiz runner
│   ├── services/
│   │   ├── apiService.js            # REST API client with JWT headers & toasts
│   │   ├── authService.js           # Session persistence & role management
│   │   ├── speechService.js         # Web Speech STT & speed-controlled TTS
│   │   └── ocrService.js            # Textbook scanning pipeline
│   ├── components/
│   │   ├── Navbar.js                # Top bar with status indicator & contrast toggle
│   │   └── Sidebar.js               # Dynamic role-tailored navigation
│   └── pages/
│       ├── LandingPage.js           # Hero, SIH problem statement, feature cards
│       ├── LoginPage.js             # Teacher/Student/Community tabs & Google OAuth
│       ├── TeacherDashboard.js      # Metrics, primary tools, recent translations
│       ├── StudentDashboard.js      # Kid-friendly cards (Listen & Learn, Voice Answer)
│       ├── TextTranslatorPage.js    # Core runtime translator with script toggles
│       ├── VoiceTranslatorPage.js   # Live teacher microphone speech translation
│       ├── TTSPage.js               # Speed-controlled Text-to-Speech studio
│       ├── OCRPage.js               # 'Scan & Tell' textbook OCR tool with JCERT presets
│       ├── LessonsPage.js           # Bilingual curriculum lesson creator & viewer
│       ├── QuizPage.js              # Interactive voice/text quiz runner & grading
│       ├── StudentResponsesPage.js  # Teacher review of student quiz answers
│       ├── HistoryPage.js           # Archived translations with audio repeat
│       ├── LanguagesDirectoryPage.js# 5 Tribal language profiles & state filter
│       ├── SettingsPage.js          # Preferences, audio speed & AI provider switch
│       └── ProfilePage.js           # Account details & security status
├── backend/
│   ├── server.js                    # Express app entrypoint & static serving
│   ├── services/
│   │   ├── databaseService.js       # Embedded persistent data layer
│   │   ├── translationService.js    # Modular engine (Demo, Bhashini, AI4Bharat)
│   │   └── transliterationService.js# Ol Chiki & Warang Citi script engines
│   ├── controllers/
│   │   ├── authController.js        # bcrypt login, register & Google auth
│   │   ├── translationController.js # Runtime translate & history endpoints
│   │   ├── lessonController.js      # Lesson CRUD
│   │   ├── quizController.js        # Quiz & response scoring
│   │   ├── ocrController.js         # OCR preset & scan handler
│   │   └── configController.js      # System health & settings API
│   ├── routes/                      # Express routers
│   └── middleware/
│       ├── authMiddleware.js        # JWT verification & role authorization
│       └── errorMiddleware.js       # Safe error responses
├── data/
│   ├── translationData.json         # Authentic 5 tribal language dictionaries
│   └── seedData.json                # Pre-seeded users, JCERT lessons, quizzes
├── .env.example                     # Environment configuration template
├── package.json                     # NPM dependencies & scripts
└── README.md                        # Documentation
```

---

## 10. Honest Linguistic Principles & Known Limitations

1. **Digital Corpus Scarcity**: Lesser-known tribal languages (such as Kharia and Ho) possess significantly smaller digital text and audio corpora compared to Hindi or Bengali.
2. **Sub-Dialect Regional Variations**: Santhali spoken in Dumka contains subtle dialectal variations compared to Santhali spoken in East Singhbhum or Mayurbhanj.
3. **Demo Mode Behavior**: Bhasha Setu **never** invents fake or hallucinated translations. In Demo Mode, if a sentence is not in the verified local dictionary or grammar patterns, the UI informs the user to connect an online provider (Bhashini / AI4Bharat) in Settings.
4. **Browser Speech Synthesis**: Web Speech API uses Indian English / Hindi phonetic phonemes as a fallback for tribal Latin strings until custom FastPitch / Piper TTS models are loaded.

---

## 11. Future Scope & Roadmap

- **On-Device Edge Inference**: Compile quantised IndicTrans2 and Whisper models to ONNX Runtime Web for 100% offline edge neural machine translation.
- **Custom Piper TTS Models**: Train lightweight neural TTS on JCERT audio recordings for Santhali Ol Chiki and Ho Warang Citi.
- **Mobile APK Release**: Wrap web components in Flutter / Capacitor for low-end Android smartphones distributed in rural schools.