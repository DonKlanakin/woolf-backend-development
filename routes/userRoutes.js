const express = require("express");
const userService = require("../services/userService");
const validator = require("../utils/validator");

const userRoutes = express.Router();
userRoutes
    .route("/")
    .get(userService.getAllUsers);
userRoutes
    .route("/register")
    .post(userService.createUser);
userRoutes
    .route("/login")
    .get(userService.getAllUsers)
    .post(userService.loginUser);
userRoutes
    .route("/:id")
    .post(validator.validateId, userService.updateUserById);
module.exports = userRoutes;
