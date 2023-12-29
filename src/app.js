/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const express = require('express');
const { default: helmet } = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const ApiErrorMessageFormatter = require('./utilities/ApiErrorMessageFormatter');
const globalErrorHandler = require('./middleware/globalErrorHandler');
const ServerConfig = require('./utilities/ServerConfig');
const userRouter = require('./routers/userRouter');

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// DEV logs
if (ServerConfig.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// TODO:DEV - log env - delete on production
console.log({ Enviroment: ServerConfig.NODE_ENV });

// Routers
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new ApiErrorMessageFormatter(`Cant find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

module.exports = app;
