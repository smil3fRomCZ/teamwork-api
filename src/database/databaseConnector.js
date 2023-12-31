const mongoose = require('mongoose');

const { DB_CONNECTION_STRING } = require('../utilities/ServerConfig');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
  } catch (error) {
    throw error;
  }
};

module.exports = connectToDatabase;


