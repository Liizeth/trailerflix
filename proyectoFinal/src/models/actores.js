const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Actores = sequelize.define('Actores', {
    id_actor: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
    }, {
        tableName: 'actores',
        timestamps: false
});

module.exports = Actores;
