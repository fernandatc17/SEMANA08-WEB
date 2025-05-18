export default (sequelize, DataTypes) => {
  const DetalleOrdenCompra = sequelize.define("detalleordencompra", {
    descripcion: {
      type: DataTypes.STRING,
    },
    cantidad: {
      type: DataTypes.INTEGER,
    },
    precio: {
      type: DataTypes.FLOAT,
    },
    montouni: {
      type: DataTypes.FLOAT,
    },
    NroOrdenC: {
      type: DataTypes.INTEGER,
    },
    CodMedicamento: {
      type: DataTypes.INTEGER,
    },
  });

  return DetalleOrdenCompra;
};
