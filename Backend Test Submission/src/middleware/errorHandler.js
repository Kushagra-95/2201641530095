const AppError = require("../utils/AppError");

function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error("Unexpected Error:", err);
  return res.status(500).json({ error: "Internal Server Error" });
}

module.exports = errorHandler;
