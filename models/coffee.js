'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class coffee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.order_detail, { foreignKey: 'coffeeID', as: 'orderDetails' });
    }
  }
  coffee.init({
    // coffeeID: {
    //   allowNull: false,
    //   autoIncrement: true,
    //   primaryKey: true,
    //   type: DataTypes.INTEGER
    // },
    coffeeID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notNull: {
            msg: "name is required"
          }
        }
    },
    size:
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    price:
    {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notNull: {
            msg: "price is required"
          },
          min: {
            args: [0],
            msg: "price must be greater than or equal to 0"
          }
        }
      
    },
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'coffee',
  });
  return coffee;
};