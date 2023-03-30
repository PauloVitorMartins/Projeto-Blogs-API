/** 
 * @param {import('sequelize').Sequelize} sequelize     
 * @param {import('sequelize').DataTypes} DateTypes
 */

module.exports = (sequelize, DateTypes) => {
    const UsersModel = sequelize.define('User', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DateTypes.INTEGER,
        autoIncrement: true,
      },
      email: {
        allowNull: false,
        type: DateTypes.STRING,
      },
      displayName: {
        allowNull: false,
        type: DateTypes.STRING(255),
      },
      password: {
        allowNull: false,
        type: DateTypes.INTEGER,
      },
      image: {
        allowNull: false,
        type: DateTypes.STRING,
      }
    },
     {
        tableName: 'users',
        underscored: true,
        timestamps: false,
    })
    UsersModel.associate = (models) => {
      UsersModel.hasMany(models.BlogPost,
        {
          foreignKey: 'userId',
          as: 'blogPosts'
        })
    };

    return UsersModel;
}