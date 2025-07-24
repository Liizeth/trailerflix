const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Cartelera = require('./cartelera'); 

const Resumen = sequelize.define('Resumen', {
    id_cartelera: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Cartelera,
            key: 'id'
        }
    },
    texto: {
        type: DataTypes.TEXT,
        allowNull: false
    }
    }, {
        tableName: 'resumen',
        timestamps: false
});

module.exports = Resumen;
