const urls = require("../models/shorturl");
const generateCode = require("../utils/generateCode");
const AppError = require("../utils/AppError");

function createShortUrl(req, res, next) {
  try {
    const { url, validity = 30, shortcode } = req.body;

    if (!url || typeof url !== "string") {
      return next(new AppError("Invalid URL format", 400));
    }

    let code = shortcode || generateCode();

    if (urls.has(code)) {
      return next(new AppError("Shortcode already exists", 409));
    }

    const createdAt = new Date();
    const expiry = new Date(createdAt.getTime() + validity * 60 * 1000);

    urls.set(code, {
      url,
      createdAt,
      expiry,
      clicks: 0,
      clickDetails: [],
    });

    return res.status(201).json({
      shortLink: `http://localhost:5000/${code}`,
      expiry: expiry.toISOString(),
    });
  } catch (err) {
    next(err);
  }
}

function redirectHandler(req, res, next) {
  try {
    const { shortcode } = req.params;

    const record = urls.get(shortcode);
    if (!record) return next(new AppError("Shortcode not found", 404));

    if (new Date() > record.expiry) {
      return next(new AppError("Link expired", 410));
    }

    record.clicks++;
    record.clickDetails.push({
      timestamp: new Date(),
      referrer: req.get("Referer") || "Direct",
      geo: "Unknown",
    });

    return res.redirect(record.url);
  } catch (err) {
    next(err);
  }
}


function getStats(req, res, next) {
  try {
    const { shortcode } = req.params;

    const record = urls.get(shortcode);
    if (!record) return next(new AppError("Shortcode not found", 404));

    return res.json({
      url: record.url,
      createdAt: record.createdAt,
      expiry: record.expiry,
      clicks: record.clicks,
      clickDetails: record.clickDetails,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { createShortUrl, redirectHandler, getStats };
