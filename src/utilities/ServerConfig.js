class ServerConfig {
  static SERVER_PORT = process.env.PORT;

  static NODE_ENV = process.env.NODE_ENV;
}

module.exports = ServerConfig;
