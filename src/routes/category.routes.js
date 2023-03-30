const express = require('express');
const validateToken = require('../middleware/validateToke');

const categoriesController = require('../controllers/categoriesController');

const categoryRoute = express.Router();

categoryRoute.post('/', validateToken, categoriesController.creatingCategories);
categoryRoute.get('/', validateToken, categoriesController.getCategories);

module.exports = categoryRoute;