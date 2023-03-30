const categoryService = require('../services/categoryService');

const creatingCategories = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: '"name" is required' });
        }
        const response = await categoryService.categoryMaker(name);
        return res.status(201).json(response);
    } catch (error) {
        next(error);
    }
};

const getCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getAll();
        return res.status(200).json(categories);
      } catch (error) {
        next(error);
      }
    };

module.exports = {
    creatingCategories,
    getCategories,
};