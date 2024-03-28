const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    id_payment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id_payment",
      autoIncrement: true
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "amount",
      autoIncrement: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "date",
      autoIncrement: false
    },
    paymentmethod: {
      type: DataTypes.CHAR(50),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "paymentmethod",
      autoIncrement: false
    },
    state: {
      type: DataTypes.CHAR(50),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "state",
      autoIncrement: false
    },
    id_member: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "id_member",
      autoIncrement: false,
      references: {
        key: "id_member",
        model: "members_model"
      }
    },
    id_booking: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "id_booking",
      autoIncrement: false,
      references: {
        key: "id_booking",
        model: "bookings_model"
      }
    }
  };
  const options = {
    tableName: "Payments",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: "public",
  };
  const PaymentsModel = sequelize.define("Payments_model", attributes, options);
  PaymentsModel.associate= function(models){
    PaymentsModel.belongsTo(models.bookings_model, {
      foreignKey: 'id_booking'
    });
    PaymentsModel.belongsTo(models.members_model, {
      foreignKey: 'id_member'
    });
  };
  return PaymentsModel;
};