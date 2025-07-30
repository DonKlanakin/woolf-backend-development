const express = require("express");

const userService = require("../services/userService");
const securityManager = require("../security/securityManager");
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
    .post(securityManager.verifyToken, validator.validateId, userService.updateUserById);
module.exports = userRoutes;
