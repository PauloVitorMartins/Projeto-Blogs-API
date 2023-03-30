/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {*} DataTypes
 * @returns
 */

module.exports = (sequelize, DataTypes) => {
    const blogPostModel = sequelize.define('BlogPost', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      published: {
          defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
      },
      updated: {
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
      }
    }, {
      timestamps: false,
      underscored: true,
      tableName: 'blog_posts',
    })
    blogPostModel.associate = (models) => {
      blogPostModel.belongsTo(models.User,
        {
          foreignKey: 'userId',
          as: 'user'
        })
    };
  
    return blogPostModel;
  } 