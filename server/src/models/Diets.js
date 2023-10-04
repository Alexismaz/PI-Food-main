const {DataTypes} = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("diets", {
        Nombre: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
}