class ServerConfig {
  static SERVER_PORT = process.env.PORT;
  static NODE_ENV = process.env.NODE_ENV;
  static DB_USERNAME = process.env.DB_USERNAME;
  static DB_PASSWORD = process.env.DB_PASSWORD;
  static DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
}

module.exports = ServerConfig;
