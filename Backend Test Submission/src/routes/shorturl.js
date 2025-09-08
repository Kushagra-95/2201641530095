const express = require("express");
const { createShortUrl, getStats } = require("../controllers/shorturlController");

const router = express.Router();

router.post("/", createShortUrl);
router.get("/:shortcode", getStats);

module.exports = router;
