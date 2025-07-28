const express = require('express');
const systemService = require('../services/systemService');

const systemRoutes = express.Router();
systemRoutes.route('/env').get(systemService.getEnv);
systemRoutes.all(/./, systemService.handleNotFound);

module.exports = systemRoutes;