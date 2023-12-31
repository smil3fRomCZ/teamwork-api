const mongoose = require('mongoose');

const app = require('./src/app');
const { SERVER_PORT } = require('./src/utilities/ServerConfig');
const connectToDatabase = require('./src/database/databaseConnector');

const PORT = SERVER_PORT;

// Connect to MongoDB
connectToDatabase();

// Start server in case of successfull conection
mongoose.connection.once('open', () => {
  console.info('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server listen on port: ${PORT}`);
  });
})

