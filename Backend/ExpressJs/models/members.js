const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    id_member: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id_member",
      autoIncrement: true
    },
    name: {
      type: DataTypes.CHAR(50),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "name",
      autoIncrement: false
    },
    lastName: {
      type: DataTypes.CHAR(50),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "lastName",
      autoIncrement: false
    },
    email: {
      type: DataTypes.CHAR(100),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "email",
      autoIncrement: false
    },
    phone: {
      type: DataTypes.CHAR(15),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "phone",
      autoIncrement: false
    },
    company: {
      type: DataTypes.CHAR(100),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "company",
      autoIncrement: false
    }
  };
  const options = {
    tableName: "members",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: "public",
  };
  const MembersModel = sequelize.define("members_model", attributes, options);
  MembersModel.associate = function (models) {
    MembersModel.hasMany(models.bookings_model, {
      foreignKey: "id_member",
    });
    MembersModel.hasMany(models.Payments_model, {
      foreignKey: "id_member",
    });
  }
  return MembersModel;
}