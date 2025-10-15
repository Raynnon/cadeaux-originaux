const app = require("./src/app");
const connectDatabase = require("./src/config/database");
const setupDevelopmentMode = require("./src/config/developmentSetup");

// Connect to database
connectDatabase();

// Setup development mode if needed
setupDevelopmentMode();

// Start server (only in local development)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;
