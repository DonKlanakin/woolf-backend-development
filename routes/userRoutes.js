const express = require('express');
const userService = require('../services/userService');
const validator = require('../services/validator');

const userRoutes = express.Router();
//userRoutes.param('id', validateId);

userRoutes.route('/')
.get(userService.getAllUsers)
.post(userService.getUsersByQueryParams);
userRoutes.route('/:id')
.post(validator.validateId, userService.getUserById)
.patch(validator.validateId, userService.updateUserById)
.delete(userService.deleteUserById);

module.exports = userRoutes;