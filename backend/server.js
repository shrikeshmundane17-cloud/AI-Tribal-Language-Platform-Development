require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const translationRoutes = require('./routes/translationRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const quizRoutes = require('./routes/quizRoutes');
const ocrRoutes = require('./routes/ocrRoutes');
const configRoutes = require('./routes/configRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static Frontend files
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', translationRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/ocr', ocrRoutes);
app.use('/api/config', configRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'Bhasha Setu',
    version: '2.0.0',
    mode: process.env.TRANSLATION_PROVIDER || 'demo',
    timestamp: new Date().toISOString()
  });
});

// Single Page Application Fallback
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return next();
  }
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log('================================================================');
  console.log('  BHASHA SETU — AI Tribal Language Translation Platform');
  console.log(`  Server running at: http://localhost:${PORT}`);
  console.log(`  Active Translation Mode: [${(process.env.TRANSLATION_PROVIDER || 'demo').toUpperCase()}]`);
  console.log('  Languages: Santhali (Ol Chiki), Mundari, Ho (Warang Citi), Kharia, Kurukh');
  console.log('================================================================');
});