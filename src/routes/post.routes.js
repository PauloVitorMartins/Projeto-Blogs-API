const express = require('express');
const validateToken = require('../middleware/validateToke');

const postControllers = require('../controllers/postControllers');

const postRoute = express.Router();

postRoute.get('/', validateToken, postControllers.getPosts);

module.exports = postRoute;