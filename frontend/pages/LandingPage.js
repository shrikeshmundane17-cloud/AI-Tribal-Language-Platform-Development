// BHASHA SETU - LANDING PAGE
function renderLandingPage() {
  return `
    <div class="landing-hero" style="text-align: center; padding: 48px 16px; background: linear-gradient(180deg, rgba(232, 245, 233, 0.5) 0%, rgba(248, 249, 250, 1) 100%); border-radius: var(--radius-lg); margin-bottom: 40px;">
      <div style="display: inline-flex; align-items: center; gap: 8px; background: #fff; padding: 6px 16px; border-radius: var(--radius-pill); border: 1px solid var(--border); font-size: 13px; font-weight: 700; color: var(--primary); margin-bottom: 20px; box-shadow: var(--shadow-sm);">
        <span>🏆 Smart India Hackathon 2026</span>
        <span>·</span>
        <span>SIH2026042 Smart Education</span>
      </div>

      <h1 style="font-size: 42px; font-weight: 900; letter-spacing: -0.5px; color: var(--text-main); max-width: 850px; margin: 0 auto 16px; line-height: 1.2;">
        Connecting Languages. <br>
        <span style="color: var(--primary); background: linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Empowering Tribal Education.</span>
      </h1>

      <p style="font-size: 18px; color: var(--text-muted); max-width: 700px; margin: 0 auto 28px; line-height: 1.6;">
        AI-powered real-time translation and vernacular learning support for tribal communities. Seamlessly bridge Hindi &amp; English into indigenous mother tongues.
      </p>

      <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
        <a href="#translate" class="btn btn-primary btn-lg">
          🔤 Start Translating
        </a>
        <a href="#languages" class="btn btn-outline btn-lg">
          🌿 Explore Tribal Languages
        </a>
        <a href="#login" class="btn btn-secondary btn-lg">
          🔑 Login to Dashboard
        </a>
      </div>

      <!-- Quick Stats Strip -->
      <div style="display: flex; justify-content: center; gap: 24px; flex-wrap: wrap; margin-top: 40px; padding-top: 24px; border-top: 1px solid var(--border);">
        <div style="text-align: center;">
          <div style="font-size: 28px; font-weight: 800; color: var(--primary);">5+</div>
          <div style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Tribal Languages</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 28px; font-weight: 800; color: var(--secondary);">Ol Chiki &amp; Warang Citi</div>
          <div style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Indigenous Scripts</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 28px; font-weight: 800; color: var(--accent);">NEP 2020</div>
          <div style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Mother Tongue Mandate</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 28px; font-weight: 800; color: #6A1B9A;">100%</div>
          <div style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Offline Ready Architecture</div>
        </div>
      </div>
    </div>

    <!-- TRIBAL LANGUAGES SECTION -->
    <div style="margin-bottom: 48px;">
      <div style="text-align: center; margin-bottom: 28px;">
        <h2 style="font-size: 26px;">Supported Tribal Languages</h2>
        <p style="color: var(--text-muted); font-size: 14px; margin-top: 6px;">Authentic vocabulary, scripts, and phonetic pronunciation guide</p>
      </div>

      <div class="grid grid-3">
        <div class="card" style="border-top: 4px solid var(--primary);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <div>
              <h3 style="font-size: 20px;">Santhali / Santali</h3>
              <div style="font-size: 14px; color: var(--primary); font-weight: 700; margin-top: 2px;">ᱥᱟᱱᱛᱟᱲᱤ</div>
            </div>
            <span class="badge badge-primary">Ol Chiki Script</span>
          </div>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 14px; line-height: 1.5;">
            Spoken across Jharkhand, Odisha, West Bengal, and Assam. Full support for authentic Ol Chiki script and Roman transliteration.
          </p>
          <div style="background: var(--bg-page); padding: 10px; border-radius: var(--radius-sm); font-size: 12px;">
            <strong>Sample:</strong> "Johar" (Hello) → <span style="color: var(--primary); font-weight: 700;">ᱡᱚᱦᱟᱨ</span>
          </div>
        </div>

        <div class="card" style="border-top: 4px solid var(--secondary);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <div>
              <h3 style="font-size: 20px;">Mundari</h3>
              <div style="font-size: 14px; color: var(--secondary); font-weight: 700; margin-top: 2px;">मुण्डारी</div>
            </div>
            <span class="badge badge-secondary">Devanagari / Roman</span>
          </div>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 14px; line-height: 1.5;">
            Austroasiatic Munda language of the Munda people in Jharkhand and Chota Nagpur plateau.
          </p>
          <div style="background: var(--bg-page); padding: 10px; border-radius: var(--radius-sm); font-size: 12px;">
            <strong>Sample:</strong> "Dak" (Water) · "Guru" (Teacher)
          </div>
        </div>

        <div class="card" style="border-top: 4px solid var(--accent);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <div>
              <h3 style="font-size: 20px;">Ho</h3>
              <div style="font-size: 14px; color: var(--accent); font-weight: 700; margin-top: 2px;">𑢹𑣉𑣉</div>
            </div>
            <span class="badge badge-accent">Warang Citi Script</span>
          </div>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 14px; line-height: 1.5;">
            Spoken in Kolhan division and Mayurbhanj. Engineered with Warang Citi script glyph support and phonetics.
          </p>
          <div style="background: var(--bg-page); padding: 10px; border-radius: var(--radius-sm); font-size: 12px;">
            <strong>Sample:</strong> "Ho" → <span style="color: var(--accent); font-weight: 700;">𑢹𑣉𑣉</span>
          </div>
        </div>

        <div class="card" style="border-top: 4px solid var(--teal);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <div>
              <h3 style="font-size: 20px;">Kharia</h3>
              <div style="font-size: 14px; color: var(--teal); font-weight: 700; margin-top: 2px;">खड़िया</div>
            </div>
            <span class="badge badge-purple">Latin / Devanagari</span>
          </div>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 14px; line-height: 1.5;">
            Indigenous language of Simdega, Gumla, and Odisha. Verified educational classroom vocabulary.
          </p>
          <div style="background: var(--bg-page); padding: 10px; border-radius: var(--radius-sm); font-size: 12px;">
            <strong>Sample:</strong> "Udu" (Water) · "Hon" (Student)
          </div>
        </div>

        <div class="card" style="border-top: 4px solid #6A1B9A;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <div>
              <h3 style="font-size: 20px;">Kurukh (Oraon)</h3>
              <div style="font-size: 14px; color: #6A1B9A; font-weight: 700; margin-top: 2px;">कुड़ुख़</div>
            </div>
            <span class="badge badge-primary">Tolong Siki</span>
          </div>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 14px; line-height: 1.5;">
            Dravidian language spoken by 2 million+ Oraon community members across Jharkhand and Chhattisgarh.
          </p>
          <div style="background: var(--bg-page); padding: 10px; border-radius: var(--radius-sm); font-size: 12px;">
            <strong>Sample:</strong> "Penen" (Greetings) · "Una" (Water)
          </div>
        </div>

        <div class="card" style="background: linear-gradient(135deg, var(--primary-bg) 0%, #fff 100%); display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
          <div style="font-size: 36px; margin-bottom: 8px;">📖</div>
          <h3 style="font-size: 18px;">Honest Linguistic Policy</h3>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 6px;">
            Never fabricates false translations. Local mode uses verified lexicons; complex sentences connect to Bhashini/AI4Bharat.
          </p>
          <a href="#languages" class="btn btn-outline btn-sm" style="margin-top: 14px;">View Directory &amp; Disclaimers</a>
        </div>
      </div>
    </div>

    <!-- HOW IT FIXES THE ROOT PROBLEM (SIH SLIDE 2 RECREATED) -->
    <div class="card" style="padding: 36px; margin-bottom: 48px; background: #fff;">
      <div style="text-align: center; margin-bottom: 30px;">
        <span class="badge badge-secondary">SIH 2026 Problem Statement</span>
        <h2 style="font-size: 26px; margin-top: 8px;">Solving The 40%+ Dropout Crisis in Tribal Primary Schools</h2>
        <p style="color: var(--text-muted); font-size: 14px;">Addressing the core classroom challenges identified in JCERT Jharkhand schools</p>
      </div>

      <div class="grid grid-3">
        <div style="border-left: 3px solid var(--primary); padding-left: 16px;">
          <h4 style="font-size: 16px; color: var(--primary); margin-bottom: 8px;">1. Eliminating 'Language Shock'</h4>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
            Tribal children often know 0% Hindi when entering Class 1. Translating instruction to their home tongue removes fear and boosts engagement.
          </p>
        </div>
        <div style="border-left: 3px solid var(--secondary); padding-left: 16px;">
          <h4 style="font-size: 16px; color: var(--secondary); margin-bottom: 8px;">2. Empowering Non-Tribal Teachers</h4>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
            Most state-appointed teachers do not speak local Adivasi dialects. Bhasha Setu serves as a seamless bilingual teaching assistant.
          </p>
        </div>
        <div style="border-left: 3px solid var(--accent); padding-left: 16px;">
          <h4 style="font-size: 16px; color: var(--accent); margin-bottom: 8px;">3. NEP 2020 Mandate Fulfilment</h4>
          <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
            Directly adheres to National Education Policy guidelines enforcing mother tongue / home language instruction up to Grade 5.
          </p>
        </div>
      </div>
    </div>

    <!-- CORE FEATURES SECTION -->
    <div style="margin-bottom: 48px;">
      <div style="text-align: center; margin-bottom: 28px;">
        <h2 style="font-size: 26px;">Integrated Vernacular Pedagogy Suite</h2>
      </div>

      <div class="action-grid">
        <div class="action-tile" onclick="window.location.hash='#translate'">
          <div class="tile-icon">🔤</div>
          <h3>Real-Time Text Translator</h3>
          <p>Translate any runtime text between Hindi/English and Santhali, Mundari, Ho, Kharia, and Kurukh.</p>
        </div>

        <div class="action-tile" onclick="window.location.hash='#voice'">
          <div class="tile-icon">🎤</div>
          <h3>Live Teacher Mic Translation</h3>
          <p>Teacher speaks standard Hindi into the microphone; the system speaks back in the student's mother tongue.</p>
        </div>

        <div class="action-tile" onclick="window.location.hash='#ocr'">
          <div class="tile-icon">📷</div>
          <h3>'Scan &amp; Tell' Textbook OCR</h3>
          <p>Scan JCERT textbook pages with camera or upload photos, extract text, edit, and translate instantly.</p>
        </div>

        <div class="action-tile" onclick="window.location.hash='#tts'">
          <div class="tile-icon">🔊</div>
          <h3>Speed-Controlled Text-to-Speech</h3>
          <p>Adjust speech speed from 0.5x to 2.0x, play, pause, and repeat tribal pronunciations with sample words.</p>
        </div>

        <div class="action-tile" onclick="window.location.hash='#quiz'">
          <div class="tile-icon">📝</div>
          <h3>Interactive Voice Quizzing</h3>
          <p>Teachers create quizzes; students answer verbally or via text to assess conceptual grasp.</p>
        </div>

        <div class="action-tile" onclick="window.location.hash='#lessons'">
          <div class="tile-icon">📚</div>
          <h3>Curriculum Lesson Library</h3>
          <p>Explore bilingual lessons in Mathematics, Science, and Environmental Studies.</p>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <footer style="text-align: center; padding: 32px 16px; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 13px;">
      <p style="font-weight: 700; color: var(--text-main);">BHASHA SETU (भाषा सेतु) — Smart India Hackathon 2026</p>
      <p style="margin-top: 4px;">Problem Statement SIH2026042 · Team THUNDERS · Designed for JCERT Primary Schools</p>
      <div style="margin-top: 12px; display: flex; gap: 16px; justify-content: center;">
        <a href="#translate">Translator</a>
        <a href="#voice">Voice Mic</a>
        <a href="#ocr">OCR Scanner</a>
        <a href="#languages">Tribal Directory</a>
        <a href="#settings">Settings</a>
      </div>
    </footer>
  `;
}