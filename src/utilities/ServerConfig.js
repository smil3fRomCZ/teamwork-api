class ServerConfig {
  static SERVER_PORT = process.env.PORT;

  static NODE_ENV = process.env.NODE_ENV;

  static DB_HOST = process.env.DB_HOST;

  static DB_NAME = process.env.DB_NAME;

  static DB_USERNAME = process.env.DB_USERNAME;

  static DB_PASSWORD = process.env.DB_PASSWORD;

  static DB_PORT = process.env.DB_PORT;

  static DB_DIALECT = process.env.DB_DIALECT;

  static DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
}

module.exports = ServerConfig;
