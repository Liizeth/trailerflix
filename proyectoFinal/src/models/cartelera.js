const { DataTypes } = require('sequelize');
const sequelize = require('../database');


const Cartelera = sequelize.define('Cartelera', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    porter: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    trailer: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    temporada: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    duracion: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_genero: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    // campo nuevo
    fecha_lanzamiento: {
        type: DataTypes.DATE, 
        allowNull: true       
    }
}, {
        tableName: 'cartelera',
        timestamps: false
});

module.exports =Cartelera;
