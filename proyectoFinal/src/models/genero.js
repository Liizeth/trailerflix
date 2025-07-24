const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Genero = sequelize.define('Genero', {
    id_genero: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tipo_de_genero: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
    }, {
        tableName: 'genero',
        timestamps: false
});

module.exports = Genero;
