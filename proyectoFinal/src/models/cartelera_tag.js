const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // tu conexión a la base



const CarteleraTag = sequelize.define('cartelera_tag', {
    id_cartelera: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    id_tag: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }
    }, {
        tableName: 'cartelera_tag',
        timestamps: false,
});

module.exports = CarteleraTag;