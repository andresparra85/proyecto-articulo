const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    id_service: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id_service",
      autoIncrement: false
    },
    servicename: {
      type: DataTypes.CHAR(50),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "servicename",
      autoIncrement: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "description",
      autoIncrement: false
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
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "duration",
      autoIncrement: false
    },
     location: {
      type: DataTypes.CHAR(100),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: " location",
      autoIncrement: false
    },
    cost: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "cost",
      autoIncrement: false
    }
  };
  const options = {
    tableName: "services",
    comment: "",
    indexes: []
  };
  const ServicesModel = sequelize.define("services_model", attributes, options);
  return ServicesModel;
};