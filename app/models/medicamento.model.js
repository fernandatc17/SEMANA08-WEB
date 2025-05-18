export default (sequelize, DataTypes) => {
  const Medicamento = sequelize.define("medicamento", {
    descripcionMed: {
      type: DataTypes.STRING,
    },
    fechaFabricacion: {
      type: DataTypes.DATE,
    },
    fechaVencimiento: {
      type: DataTypes.DATE,
    },
    Presentacion: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    precioVentaUni: {
      type: DataTypes.FLOAT,
    },
    precioVentaPres: {
      type: DataTypes.FLOAT,
    },
    Marca: {
      type: DataTypes.STRING,
    },
    CodTipoMed: {
      type: DataTypes.INTEGER,
    },
    CodEspec: {
      type: DataTypes.INTEGER,
    },
  });

  return Medicamento;
};
