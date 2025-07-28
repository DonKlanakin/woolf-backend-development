const express = require("express");
const userService = require("../services/userService");

const userRoutes = express.Router();
userRoutes
    .route("/")
    .get(userService.getAllUsers)
    .post(userService.createUser);

module.exports = userRoutes;