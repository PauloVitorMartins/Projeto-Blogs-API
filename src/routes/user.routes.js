const express = require('express');
const validateToken = require('../middleware/validateToke');

const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/', userController.register);
userRouter.get('/', validateToken, userController.getAllUsers);
userRouter.get('/:id', validateToken, userController.userById);

module.exports = userRouter;