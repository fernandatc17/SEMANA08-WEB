export default (sequelize, DataTypes) => {
  const OrdenCompra = sequelize.define("ordencompra", {
    fechaEmision: {
      type: DataTypes.DATE,
    },
    Situacion: {
      type: DataTypes.STRING,
    },
    Total: {
      type: DataTypes.FLOAT,
    },
    NrofacturaProv: {
      type: DataTypes.STRING,
    },
    CodLab: {
      type: DataTypes.INTEGER,
    },
  });

  return OrdenCompra;
};
