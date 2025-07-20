const express = require('express');
const userService = require('../services/userService');

const userRoutes = express.Router();
userRoutes.param('id', userService.checkUserId);
userRoutes.route('/').get(userService.getAllUsers).post(userService.getUsersByQueryParams);
userRoutes.route('/:id').post(userService.getUserById).patch(userService.updateUserById).delete(userService.deleteUserById);

module.exports = userRoutes;