// BHASHA SETU - STUDENT DASHBOARD
function renderStudentDashboard() {
  const user = window.authService.getUser();

  return `
    <div style="margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <h1 style="font-size: 26px; font-weight: 800;">Student Learning Corner</h1>
          <p style="color: var(--text-muted); font-size: 14px; margin-top: 4px;">
            Chhatr Dashboard · Welcome, ${user ? user.name : 'Birsa'}! (Class 4)
          </p>
        </div>
        <span class="badge badge-secondary" style="font-size: 13px; padding: 6px 14px;">
          🌿 Learning Santhali &amp; Mundari
        </span>
      </div>
    </div>

    <!-- STUDENT CALL-TO-ACTION BIG TILES -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px; margin-bottom: 30px;">
      
      <div class="card" style="background: linear-gradient(135deg, var(--accent) 0%, #0D47A1 100%); color: #fff; cursor: pointer;" onclick="window.location.hash='#lessons'">
        <div style="font-size: 42px; margin-bottom: 12px;">🎧</div>
        <h3 style="font-size: 20px; color: #fff;">Listen &amp; Learn</h3>
        <p style="font-size: 13px; opacity: 0.9; margin-top: 6px;">
          Listen to lessons in your home language with audio pronunciation.
        </p>
        <div style="margin-top: 16px; font-weight: 700; font-size: 14px; display: flex; align-items: center; gap: 6px;">
          Open Lessons <span>→</span>
        </div>
      </div>

      <div class="card" style="background: linear-gradient(135deg, var(--secondary) 0%, #BF360C 100%); color: #fff; cursor: pointer;" onclick="window.location.hash='#voice'">
        <div style="font-size: 42px; margin-bottom: 12px;">🎤</div>
        <h3 style="font-size: 20px; color: #fff;">Voice Answer</h3>
        <p style="font-size: 13px; opacity: 0.9; margin-top: 6px;">
          Speak your answers directly into the microphone in your mother tongue.
        </p>
        <div style="margin-top: 16px; font-weight: 700; font-size: 14px; display: flex; align-items: center; gap: 6px;">
          Speak Now <span>→</span>
        </div>
      </div>

      <div class="card" style="background: linear-gradient(135deg, var(--primary) 0%, #0D3310 100%); color: #fff; cursor: pointer;" onclick="window.location.hash='#translate'">
        <div style="font-size: 42px; margin-bottom: 12px;">🔤</div>
        <h3 style="font-size: 20px; color: #fff;">Text Translation</h3>
        <p style="font-size: 13px; opacity: 0.9; margin-top: 6px;">
          Type words or sentences to see Ol Chiki and tribal words.
        </p>
        <div style="margin-top: 16px; font-weight: 700; font-size: 14px; display: flex; align-items: center; gap: 6px;">
          Type Words <span>→</span>
        </div>
      </div>

      <div class="card" style="background: linear-gradient(135deg, var(--danger) 0%, #7F0000 100%); color: #fff; cursor: pointer;" onclick="window.location.hash='#quiz'">
        <div style="font-size: 42px; margin-bottom: 12px;">📝</div>
        <h3 style="font-size: 20px; color: #fff;">Play Quiz</h3>
        <p style="font-size: 13px; opacity: 0.9; margin-top: 6px;">
          Test your knowledge with fun word games and quiz badges.
        </p>
        <div style="margin-top: 16px; font-weight: 700; font-size: 14px; display: flex; align-items: center; gap: 6px;">
          Start Quiz <span>→</span>
        </div>
      </div>

    </div>

    <!-- STUDENT SECONDARY TOOLS -->
    <div class="grid grid-3">
      <div class="card" onclick="window.location.hash='#ocr'" style="cursor: pointer;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="font-size: 28px;">📷</div>
          <div>
            <h4 style="font-size: 16px;">Scan Textbook</h4>
            <div style="font-size: 12px; color: var(--text-muted);">Snap page &amp; read aloud</div>
          </div>
        </div>
      </div>

      <div class="card" onclick="window.location.hash='#tts'" style="cursor: pointer;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="font-size: 28px;">🔊</div>
          <div>
            <h4 style="font-size: 16px;">Speed Control Audio</h4>
            <div style="font-size: 12px; color: var(--text-muted);">Slow, normal &amp; repeat</div>
          </div>
        </div>
      </div>

      <div class="card" onclick="window.location.hash='#history'" style="cursor: pointer;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="font-size: 28px;">📅</div>
          <div>
            <h4 style="font-size: 16px;">My Learning Words</h4>
            <div style="font-size: 12px; color: var(--text-muted);">Review saved translations</div>
          </div>
        </div>
      </div>
    </div>
  `;
}