const userRouter = require('express').Router();

const userController = require('../controllers/userControllers');

userRouter.get('/', userController.getAllUsers);

module.exports = userRouter;
