const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    id_space: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id_space",
      autoIncrement: true
    },
    spacename: {
      type: DataTypes.CHAR(50),
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "spacename",
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
    capacitance: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "capacitance",
      autoIncrement: false
    },
    precioporhora: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "precioporhora",
      autoIncrement: false
    }
  };
  const options = {
    tableName: "spaces",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: "public",
    
  };
  const SpacesModel = sequelize.define("spaces_model", attributes, options);
  SpacesModel.associate = function (models) {
    SpacesModel.hasMany(models.bookings_model, {
      foreignKey: "id_space",
    });
  }
  return SpacesModel;
};