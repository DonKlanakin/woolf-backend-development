const express = require('express');
const customerService = require('../services/customerService');
const validator = require('../utils/validator');

const customerRoutes = express.Router();
customerRoutes.route('/')
.get(customerService.getAllCustomers)
.post(customerService.createCustomer);
customerRoutes.route('/:id')
.post(validator.validateId, customerService.getCustomerById)
.patch(validator.validateId, customerService.updateCustomerById)
.delete(validator.validateId, customerService.deleteCustomerById);

module.exports = customerRoutes;