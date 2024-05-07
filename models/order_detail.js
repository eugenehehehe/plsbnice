'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsTo(models.order_list);
      // this.belongsTo(models.coffee);
      this.belongsTo(models.order_list, { foreignKey: 'listID' });
      this.belongsTo(models.coffee, { foreignKey: 'coffeeID', as: 'orderCoffee' });
    }
  }
  order_detail.init({
    idOrderDetail: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    listID:DataTypes.INTEGER,
    coffeeID:DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'order_detail',
  });
  return order_detail;
};
