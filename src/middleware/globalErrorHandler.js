const ServerConfig = require("../utilities/ServerConfig");

const sendErrorDev = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
  });
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    return res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
  // B) Programming or other unknown error: don't leak error details
  // 1) Send generic message
  return res.status(err.statusCode).render("error", {
    status: "error",
    msg: "Please try again later.",
  });
};

module.exports = (err, req, res, next) => {
  const developmentError = { ...err };
  developmentError.statusCode = err.statusCode || 500;
  developmentError.status = err.status || "error";
  developmentError.message = err.message;
  developmentError.stack = err.stack;

  if (ServerConfig.NODE_ENV === "development") {
    sendErrorDev(developmentError, req, res);
  } else if (ServerConfig.NODE_ENV === "production") {
    const productionError = { ...err };
    productionError.message = err.message;

    sendErrorProd(productionError, req, res);
  }
};
