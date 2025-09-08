const express = require("express");
const { logger } = require("../../Logging Middleware"); // Adjust path if needed
const shortUrlRoutes = require("./routes/shorturl");
const { redirectHandler } = require("./controllers/shorturlController");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());


app.use(logger);


app.use("/shorturls", shortUrlRoutes);
app.get("/:shortcode", redirectHandler);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
