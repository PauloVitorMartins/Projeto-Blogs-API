const { User } = require('../models');

const UserFound = async (email) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        const response = 'Invalid fields';
        const status = 400;
        const ob = { status, message: response };
        return ob;
    }
    return user;
};

const UsersFound = () => User.findAll({ attributes: { exclude: ['password'] } });

const emailRegistered = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    const response = 'User already registered';
    return { res: 409, message: response };
}
return { res: 'ok' };
};

const UserFoundById = (id) => { 
  const user = User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  return user;
};

const register = async ({ displayName, email, password, image }) => {
    const newUser = await User.create({ displayName, email, password, image });
    return newUser;
  };

  module.exports = {
    UserFound,
    register,
    emailRegistered,
    UsersFound,
    UserFoundById,
  };