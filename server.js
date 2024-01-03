const mongoose = require("mongoose");

const app = require("./src/app");
const { SERVER_PORT } = require("./src/utilities/ServerConfig");
const connectToDatabase = require("./src/database/databaseConnector");

// Connect to MongoDB
connectToDatabase();

// Start server in case of successfull DB conection
mongoose.connection.once("open", () => {
  console.info("Connected to MongoDB");
  app.listen(SERVER_PORT, () => {
    console.log(`Server runing on port: ${SERVER_PORT}`);
  });
});
