// BHASHA SETU - QUIZ SYSTEM (TEACHER CREATE + STUDENT TAKE QUIZ)
let currentQuizList = [];
let activeQuizIndex = 0;
let userQuizAnswers = [];
let quizScore = 0;

async function renderQuizPage() {
  const role = window.authService.getRole();

  try {
    const res = await window.apiService.get('/quizzes');
    if (res.success) {
      currentQuizList = res.quizzes || [];
    }
  } catch (e) {
    console.warn(e);
  }

  // Reset quiz index
  activeQuizIndex = 0;
  userQuizAnswers = [];
  quizScore = 0;

  return `
    <div style="max-width: 800px; margin: 0 auto;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 26px; font-weight: 800;">Tribal Language Quiz Platform</h1>
          <p style="color: var(--text-muted); font-size: 14px; margin-top: 4px;">
            Conceptual vocabulary assessment with text and voice answering options
          </p>
        </div>

        ${role === 'teacher' ? `
          <button class="btn btn-secondary" onclick="openCreateQuizModal()">
            ➕ Create New Quiz Question
          </button>
        ` : ''}
      </div>

      <!-- QUIZ RUNNER CARD CONTAINER -->
      <div id="quiz-runner-container">
        ${renderActiveQuestion()}
      </div>
    </div>
  `;
}

function renderActiveQuestion() {
  if (!currentQuizList.length) {
    return `<div class="card" style="text-align: center; padding: 40px;">No quiz questions available yet.</div>`;
  }

  if (activeQuizIndex >= currentQuizList.length) {
    return renderQuizResults();
  }

  const q = currentQuizList[activeQuizIndex];
  const progressPercent = Math.round(((activeQuizIndex) / currentQuizList.length) * 100);

  return `
    <div class="quiz-card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span style="font-size: 13px; font-weight: 700; color: var(--text-muted);">
          Question ${activeQuizIndex + 1} of ${currentQuizList.length}
        </span>
        <div style="display: flex; gap: 6px;">
          <span class="chip blue">${q.language}</span>
          <span class="chip orange">${q.difficulty}</span>
          <span class="chip">Score: ${quizScore}</span>
        </div>
      </div>

      <!-- PROGRESS BAR -->
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width: ${progressPercent}%;"></div>
      </div>

      <!-- QUESTION -->
      <div style="font-size: 20px; font-weight: 800; color: var(--text-main); margin-bottom: 24px; line-height: 1.4;">
        ${q.question}
      </div>

      <!-- OPTIONS OR TEXT/VOICE ANSWER -->
      ${q.options && q.options.length > 1 ? `
        <div class="quiz-options">
          ${q.options.map(opt => `
            <button class="quiz-option-btn" onclick="selectQuizOption('${opt.replace(/'/g, "\\'")}')">
              ${opt}
            </button>
          `).join('')}
        </div>
      ` : ''}

      <!-- TEXT / VOICE INPUT -->
      <div style="margin: 18px 0;">
        <label class="form-label">Or Type / Speak Your Answer:</label>
        <div style="display: flex; gap: 10px; align-items: center;">
          <input type="text" id="quiz-student-answer" class="form-control" placeholder="Type answer here..." style="font-size: 16px; font-weight: 600;">
          <button 
            type="button" 
            id="quiz-mic-btn" 
            class="btn btn-outline" 
            onclick="handleQuizVoiceAnswer()" 
            title="Speak answer with microphone" 
            style="font-size: 20px; padding: 10px 16px;">
            🎤
          </button>
        </div>
      </div>

      <!-- FEEDBACK RESULT BOX -->
      <div id="quiz-feedback-box" style="display: none; margin: 16px 0; padding: 14px; border-radius: var(--radius-md);"></div>

      <!-- SUBMIT & NEXT BUTTONS -->
      <div style="display: flex; gap: 12px; margin-top: 20px;">
        <button id="quiz-submit-btn" class="btn btn-primary" style="flex: 1;" onclick="submitQuizAnswer('${q.id}')">
          Submit Answer
        </button>
        <button id="quiz-next-btn" class="btn btn-secondary" style="flex: 1; display: none;" onclick="goToNextQuestion()">
          Next Question →
        </button>
      </div>

    </div>
  `;
}

function selectQuizOption(opt) {
  const input = document.getElementById('quiz-student-answer');
  if (input) input.value = opt;
}

function handleQuizVoiceAnswer() {
  const input = document.getElementById('quiz-student-answer');
  const micBtn = document.getElementById('quiz-mic-btn');

  if (window.speechService.isListening) {
    window.speechService.stopListening();
    if (micBtn) micBtn.innerText = '🎤';
    return;
  }

  if (micBtn) micBtn.innerText = '🔴';
  window.speechService.startListening(
    'Hindi',
    (interim) => {
      if (input) input.value = interim;
    },
    (final) => {
      if (input) input.value = final;
      if (micBtn) micBtn.innerText = '🎤';
      window.apiService.showToast('Voice answer recognized!', 'success');
    },
    (err) => {
      if (micBtn) micBtn.innerText = '🎤';
      window.apiService.showToast('Microphone error', 'error');
    }
  );
}

async function submitQuizAnswer(quizId) {
  const input = document.getElementById('quiz-student-answer');
  const feedbackBox = document.getElementById('quiz-feedback-box');
  const submitBtn = document.getElementById('quiz-submit-btn');
  const nextBtn = document.getElementById('quiz-next-btn');

  if (!input || !input.value.trim()) {
    window.apiService.showToast('Please type or speak an answer.', 'info');
    return;
  }

  const studentAnswer = input.value.trim();

  try {
    const res = await window.apiService.post('/quizzes/submit', {
      quizId,
      studentAnswer
    });

    userQuizAnswers.push({
      quiz: currentQuizList[activeQuizIndex],
      studentAnswer,
      isCorrect: res.isCorrect,
      correctAnswer: res.correctAnswer
    });

    if (res.isCorrect) {
      quizScore += 10;
      if (feedbackBox) {
        feedbackBox.style.display = 'block';
        feedbackBox.style.background = 'var(--primary-bg)';
        feedbackBox.style.border = '2px solid #66BB6A';
        feedbackBox.style.color = 'var(--primary)';
        feedbackBox.innerHTML = `<strong>✅ Sahi Jawab! Correct!</strong><br>Your answer: ${studentAnswer}`;
      }
    } else {
      if (feedbackBox) {
        feedbackBox.style.display = 'block';
        feedbackBox.style.background = 'var(--danger-bg)';
        feedbackBox.style.border = '2px solid #EF5350';
        feedbackBox.style.color = 'var(--danger)';
        feedbackBox.innerHTML = `<strong>❌ Galat Jawab!</strong><br>Your answer: ${studentAnswer}<br>Correct Answer: <strong>${res.correctAnswer}</strong>`;
      }
    }

    if (submitBtn) submitBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'block';

  } catch (err) {
    window.apiService.showToast('Failed to submit answer', 'error');
  }
}

function goToNextQuestion() {
  activeQuizIndex++;
  const container = document.getElementById('quiz-runner-container');
  if (container) {
    container.innerHTML = renderActiveQuestion();
  }
}

function renderQuizResults() {
  const total = currentQuizList.length;
  const correctCount = userQuizAnswers.filter(a => a.isCorrect).length;
  const pct = Math.round((correctCount / total) * 100);

  return `
    <div class="quiz-card" style="text-align: center;">
      <div style="background: linear-gradient(135deg, var(--primary) 0%, #1B5E20 100%); color: #fff; padding: 28px; border-radius: var(--radius-lg); margin-bottom: 24px;">
        <div style="font-size: 56px; font-weight: 900;">${pct}%</div>
        <div style="font-size: 18px; margin-top: 4px;">${correctCount} of ${total} Questions Correct</div>
        <div class="badge" style="margin-top: 14px; font-size: 14px; background: rgba(255,255,255,0.25); color: #fff;">
          ${pct >= 70 ? '🌟 Shabash! Excellent Grasp!' : pct >= 40 ? '👍 Good Effort! Achha Kiya!' : '📖 Practice More!'}
        </div>
      </div>

      <div style="text-align: left; margin-bottom: 24px;">
        <h4 style="font-size: 16px; margin-bottom: 12px;">Answer Review:</h4>
        ${userQuizAnswers.map((item, idx) => `
          <div style="padding: 12px; margin-bottom: 8px; border-radius: var(--radius-md); background: ${item.isCorrect ? 'var(--primary-bg)' : 'var(--danger-bg)'}; border-left: 4px solid ${item.isCorrect ? '#4CAF50' : '#F44336'};">
            <div style="font-weight: 700; font-size: 13px;">${idx + 1}. ${item.quiz.question}</div>
            <div style="font-size: 12px; margin-top: 2px;">
              Your Answer: <strong>${item.studentAnswer}</strong> ${item.isCorrect ? '✅' : '❌'}
            </div>
            ${!item.isCorrect ? `<div style="font-size: 12px; color: var(--primary); font-weight: 700;">Correct: ${item.correctAnswer}</div>` : ''}
          </div>
        `).join('')}
      </div>

      <div style="display: flex; gap: 12px;">
        <button class="btn btn-outline" style="flex: 1;" onclick="renderQuizPage().then(html => document.getElementById('quiz-runner-container').innerHTML = renderActiveQuestion())">
          🔁 Try Again
        </button>
        <button class="btn btn-primary" style="flex: 1;" onclick="window.location.hash='#dashboard'">
          🏠 Return to Dashboard
        </button>
      </div>
    </div>
  `;
}

function openCreateQuizModal() {
  const modalContainer = document.getElementById('modal-container');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-overlay" onclick="closeModal(event)">
      <div class="modal-content" onclick="event.stopPropagation()">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h2 style="font-size: 20px; font-weight: 800;">Create New Quiz Question</h2>
          <button style="background: none; border: none; font-size: 20px; cursor: pointer;" onclick="closeModalDirect()">✕</button>
        </div>

        <form onsubmit="handleCreateQuizSubmit(event)">
          <div class="form-group">
            <label class="form-label">Question</label>
            <input type="text" id="new-quiz-question" class="form-control" placeholder="e.g. What is water called in Santhali?" required>
          </div>

          <div class="form-group">
            <label class="form-label">Correct Answer</label>
            <input type="text" id="new-quiz-answer" class="form-control" placeholder="e.g. Dak" required>
          </div>

          <div class="grid grid-2">
            <div class="form-group">
              <label class="form-label">Language</label>
              <select id="new-quiz-lang" class="form-select">
                <option value="Santhali">Santhali</option>
                <option value="Mundari">Mundari</option>
                <option value="Ho">Ho</option>
                <option value="Kharia">Kharia</option>
                <option value="Kurukh">Kurukh</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Difficulty</label>
              <select id="new-quiz-difficulty" class="form-select">
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Options (Comma separated, optional)</label>
            <input type="text" id="new-quiz-options" class="form-control" placeholder="Dak, Jom, Bir, Dare">
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px;">
            <button type="button" class="btn btn-outline" onclick="closeModalDirect()">Cancel</button>
            <button type="submit" class="btn btn-secondary">💾 Save Quiz</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

async function handleCreateQuizSubmit(e) {
  e.preventDefault();
  const question = document.getElementById('new-quiz-question').value;
  const correctAnswer = document.getElementById('new-quiz-answer').value;
  const language = document.getElementById('new-quiz-lang').value;
  const difficulty = document.getElementById('new-quiz-difficulty').value;
  const rawOpts = document.getElementById('new-quiz-options').value;

  const options = rawOpts ? rawOpts.split(',').map(o => o.trim()).filter(Boolean) : [correctAnswer];

  try {
    const res = await window.apiService.post('/quizzes', {
      question,
      correctAnswer,
      language,
      difficulty,
      options
    });

    if (res.success) {
      window.apiService.showToast('Quiz question saved!', 'success');
      closeModalDirect();
      const appContent = document.getElementById('app-content');
      renderQuizPage().then(html => {
        if (appContent) appContent.innerHTML = html;
      });
    }
  } catch (err) {
    window.apiService.showToast(err.message || 'Error saving quiz', 'error');
  }
}