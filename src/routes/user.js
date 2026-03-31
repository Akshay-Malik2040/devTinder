const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { getReceivedRequests, getConnections, getFeed } = require("../controllers/userController");

userRouter.get("/user/request/received", userAuth, getReceivedRequests);
userRouter.get("/user/connections", userAuth, getConnections);
userRouter.get("/feed", userAuth, getFeed);

module.exports = { userRouter };