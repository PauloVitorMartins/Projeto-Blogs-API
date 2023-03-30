const postService = require('../services/postService');

const getPosts = async (req, res, next) => {
    try {
        const response = await postService.getAllPosts();
    
        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
};

module.exports = {
    getPosts,
};