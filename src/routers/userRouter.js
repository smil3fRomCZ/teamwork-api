const userRouter = require("express").Router();

const userController = require("../controllers/userControllers");

userRouter.post("/inactive-user/:userID", userController.makeUserInactive);

userRouter
  .get("/", userController.getAllUsers)
  .post("/", userController.createNewUser);

userRouter
  .get("/:userID", userController.getUserByID)
  .delete("/:userID", userController.deleteUser)
  .patch("/:userID", userController.updateUser);

module.exports = userRouter;
