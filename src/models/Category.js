/** 
 * @param {import('sequelize').Sequelize} sequelize     
 * @param {import('sequelize').DataTypes} DateTypes
 */

module.exports = (sequelize, DataTypes) => {
    const categoryModel = sequelize.define('Category', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: 'categories',
      timestamps: false,
      underscored: true,
    });
    return categoryModel;
  } 