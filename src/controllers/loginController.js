const jwt = require('jsonwebtoken');
const UserService = require('../services/userServices');

const secret = process.env.JWT_SECRET;
const JWT_CONFIG = { 
    algorithm: 'HS256',
    expiresIn: '10d',
};

const tokenMaker = (data) => jwt.sign({ data }, secret, JWT_CONFIG);

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Some required fields are missing' });
          }
        const user = await UserService.UserFound(email);
        if (user.status === 400) {
            return res.status(400).json({ message: user.message });
        }
        const token = tokenMaker(user.dataValues);
        return res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login,
};