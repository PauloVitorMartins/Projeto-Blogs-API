'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.createTable('posts_categories', {
    post_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'blog_posts',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    category_id: {
      primaryKey: true,
      allowNull: false,
      type: Sequelize.INTEGER,
      references : {
        model: 'categories',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
   })
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable('post_categories');
  }
};
