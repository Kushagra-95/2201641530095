# URL Shortener Microservice

This microservice provides URL shortening functionality with optional custom shortcodes, automatic expiry, redirection, and basic analytics. All operations are logged via a centralized logging middleware to ensure full observability.

---

## Features

- Create shortened URLs with optional custom shortcodes.
- Default validity period of 30 minutes, with optional custom duration.
- Automatic HTTP 302 redirection for shortened URLs.
- Centralized logging middleware captures all requests and events.
- Error handling for invalid inputs, expired links, or shortcode collisions.
- Basic analytics tracking (e.g., click count).

---

## Technology Stack

- **Node.js & Express.js** – Lightweight, scalable REST API framework.
- **MongoDB** – Stores URL mappings, timestamps, and analytics.
- **Redis (optional)** – Optional caching for frequently accessed shortcodes.
- **Axios** – HTTP client used to communicate with the logging service.
- **dotenv** – Manages sensitive credentials securely via environment variables.



