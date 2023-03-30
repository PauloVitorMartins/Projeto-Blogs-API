/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {*} DataTypes
 * @returns
 */

module.exports = (sequelize, DataTypes) => {
    const postCategoryModel = sequelize.define('PostCategory', {
      postId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'blog_posts',
          key: 'id',
        },
      },
      categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
    }, {
      timestamps: false,
      underscored: true,
      tableName: 'posts_categories',
    });
    postCategoryModel.associate = (models) => {
      models.BlogPost.belongsToMany(models.Category, {
        as: 'categories',
        through: postCategoryModel,
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });
      models.Category.belongsToMany(models.BlogPost,{
        as: 'BlogPosts',
        through: postCategoryModel,
        foreignKey: 'categoryId',
        otherKey: 'postId',
      });
    }
  
    return postCategoryModel;
  }