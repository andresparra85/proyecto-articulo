const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    id_booking: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id_booking",
      autoIncrement: true
    },
    startdatetime: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "startdatetime",
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
    id_space: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "id_space",
      autoIncrement: false,
      references: {
        key: "id_space",
        model: "spaces_model"
      }
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "endDate",
      autoIncrement: false
    }
  };
  const options = {
    tableName: "bookings",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: "public",
  };
  const BookingsModel = sequelize.define("bookings_model", attributes, options);
  BookingsModel.associate= function(models){
    BookingsModel.belongsTo(models.spaces_model, {
      foreignKey: 'id_space'
    });
    BookingsModel.belongsTo(models.members_model, {
      foreignKey: 'id_member'
    });
    BookingsModel.hasMany(models.Payments_model, {
      foreignKey: "id_member",
    });
  };
  return BookingsModel;
};