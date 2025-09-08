const axios = require("axios");

let accessToken = null;
let tokenExpiry = 0; 
async function fetchToken() {
  try {
    const response = await axios.post("http://20.244.56.144/evaluation-service/auth", {
      email: "kushagranigam66@gmail.com",
      name: "Kushagra Nigam",
      rollNo: "2201641530095",
      accessCode: "sAWTuR",
      clientID: "ffd9d9cd-60c1-4695-9010-4a6dd8191deb",
      clientSecret: "thkCZnrUMbkmPnFx"
    });

    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + (response.data.expires_in - 60) * 1000; // refresh 1 min before expiry
  } catch (err) {
    console.error("Failed to fetch token:", err.message);
  }
}

async function logger(req, res, next) {
  try {
    if (!accessToken || Date.now() >= tokenExpiry) {
      await fetchToken();
    }

    await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      {
        stack: "backend",
        level: "info",
        package: "route",
        message: `${req.method} ${req.originalUrl}`,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  } catch (err) {
    console.error("Logging service failed:", err.message);
  }

  next();
}

module.exports = logger;
