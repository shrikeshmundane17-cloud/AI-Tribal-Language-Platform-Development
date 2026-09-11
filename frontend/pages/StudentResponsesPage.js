// BHASHA SETU - STUDENT RESPONSES PAGE (FOR TEACHERS)
async function renderStudentResponsesPage() {
  let responses = [];
  try {
    const res = await window.apiService.get('/quizzes/responses');
    if (res.success) responses = res.responses || [];
  } catch (e) {
    console.warn(e);
  }

  return `
    <div>
      <div style="margin-bottom: 24px;">
        <h1 style="font-size: 26px; font-weight: 800;">Student Quiz &amp; Voice Responses</h1>
        <p style="color: var(--text-muted); font-size: 14px; margin-top: 4px;">
          Review student classroom submissions, voice accuracy, and conceptual grasp
        </p>
      </div>

      <div class="card">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Quiz Question</th>
                <th>Submitted Answer</th>
                <th>Correct Answer</th>
                <th>Result</th>
                <th>Score</th>
                <th>Submitted At</th>
              </tr>
            </thead>
            <tbody>
              ${responses.length ? responses.map(r => `
                <tr>
                  <td><strong>${r.studentName || 'Student'}</strong></td>
                  <td>${r.quizId}</td>
                  <td><span style="font-weight: 600;">"${r.studentAnswer}"</span></td>
                  <td style="color: var(--text-muted);">${r.correctAnswer || 'N/A'}</td>
                  <td>
                    <span class="badge ${r.isCorrect ? 'badge-primary' : 'badge-secondary'}">
                      ${r.isCorrect ? '✅ Correct' : '❌ Needs Review'}
                    </span>
                  </td>
                  <td><strong>+${r.score} pts</strong></td>
                  <td style="font-size: 12px; color: var(--text-muted);">${new Date(r.timestamp).toLocaleDateString()} ${new Date(r.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="7" style="text-align: center; padding: 24px; color: var(--text-muted);">
                    No student quiz submissions recorded yet.
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}