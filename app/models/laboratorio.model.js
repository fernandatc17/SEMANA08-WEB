export default (sequelize, DataTypes) => {
  const Laboratorio = sequelize.define("laboratorio", {
    razonSocial: {
      type: DataTypes.STRING,
    },
    direccion: {
      type: DataTypes.STRING,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    contacto: {
      type: DataTypes.STRING,
    },
  });

  return Laboratorio;
};
