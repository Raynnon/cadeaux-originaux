const app = require("./src/app");
const connectDatabase = require("./src/config/database");
const setupDevelopmentMode = require("./src/config/developmentSetup");

// Connect to database
connectDatabase();

// Setup development mode if needed
setupDevelopmentMode();

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
