const express = require('express');
const userService = require('../services/userService');
const validator = require('../utils/validator');

const userRoutes = express.Router();
//userRoutes.param('id', validateId);
userRoutes.route('/')
.get(userService.getAllUsers)
.post(userService.createUser);
userRoutes.route('/:id')
.post(validator.validateId, userService.getUserById)
.patch(validator.validateId, userService.updateUserById)
.delete(validator.validateId, userService.deleteUserById);

module.exports = userRoutes;