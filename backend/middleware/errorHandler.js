function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: true,
    message: err.message || 'Internal Server Error'
  });
}

module.exports = errorHandler;
