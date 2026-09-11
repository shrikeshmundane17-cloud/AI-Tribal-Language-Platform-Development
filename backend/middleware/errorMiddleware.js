function errorHandler(err, req, res, next) {
  console.error('[Error Middleware]:', err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'An unexpected server error occurred.',
    timestamp: new Date().toISOString()
  });
}

module.exports = { errorHandler };