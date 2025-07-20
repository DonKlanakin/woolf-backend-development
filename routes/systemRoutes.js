const express = require('express');
const systemService = require('../services/systemService');

const systemRoutes = express.Router();
systemRoutes.route('/').get(systemService.getEnv);

module.exports = systemRoutes;