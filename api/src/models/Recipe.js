const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    spoonacularSourceUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://s3.abcstatics.com/media/gurmesevilla/2012/01/comida-rapida-casera.jpg", //poner url random
      valdate: {
        isUrl: true
      }
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull:false
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue: 0
    },
    steps: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        return JSON.parse(this.getDataValue('steps'))
      },
      set(value) {
        this.setDataValue('steps', JSON.stringify(value))
      }
    }
  });
};
