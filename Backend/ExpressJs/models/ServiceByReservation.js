const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    Id_By_Booking: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "Id_By_Booking",
      autoIncrement: false
    },
    Id_booking: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "Id_booking",
      autoIncrement: false,
      references: {
        key: "id_booking",
        model: "bookings_model"
      }
    },
    Id_Service: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "Id_Service",
      autoIncrement: false,
      references: {
        key: "id_service",
        model: "services_model"
      }
    }
  };
  const options = {
    tableName: "ServiceByReservation",
    comment: "",
    indexes: []
  };
  const ServiceByReservationModel = sequelize.define("ServiceByReservation_model", attributes, options);
  return ServiceByReservationModel;
};