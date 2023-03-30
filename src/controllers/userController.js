const jwt = require('jsonwebtoken');

const UserService = require('../services/userServices');

const secret = process.env.JWT_SECRET;
const JWT_CONFIG = { 
    algorithm: 'HS256',
    expiresIn: '10d',
};

const displayNameMessage = '"displayName" length must be at least 8 characters long';
const emailMessage = '"email" must be a valid email';
const passwordMessage = '"password" length must be at least 6 characters long';

const tokenMaker = (data) => jwt.sign({ data }, secret, JWT_CONFIG);

const validadeCamps = async (data) => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (data.displayName.length < 8) { 
        return { status: 400, message: displayNameMessage };
    }
    if (!data.email.match(validRegex)) { 
            return { status: 400, message: emailMessage };
    }
    if (data.password.length < 6) {
            return { status: 400, message: passwordMessage };
    }
    return { status: 'ok',
     };
};

const getAllUsers = async (_req, res) => {
    const users = await UserService.UsersFound();
    return res.status(200).json(users);
};

const register = async (req, res, next) => {
    try {
        const data = req.body;
        const { displayName, email, password, image } = data;
        const validated = await validadeCamps(data);
        if (validated.status === 400) { 
            return res.status(validated.status).json({ message: validated.message });
        }
        const ot = await UserService.emailRegistered(data.email);
        if (ot.res === 409) return res.status(409).json({ message: ot.message });
        const newUser = await UserService.register(
            { displayName, email, password, image },
            );
        const token = tokenMaker(newUser);
        return res.status(201).json({ token });
    } catch (error) { 
        next(error);
     }
};

const userById = async (req, res, next) => {
    try {
       const message = 'User does not exist';
       const { id } = req.params;
       const userfouById = await UserService.UserFoundById(id);
       if (!userfouById) {
        return res.status(404).json({ message });
       }
       return res.status(200).json(userfouById);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    getAllUsers,
    userById,
};