const userRouter = require("express").Router();

const userController = require("../controllers/userControllers");

userRouter.get("/", userController.getAllUsers);
userRouter.post("/", userController.createNewUser);

module.exports = userRouter;
