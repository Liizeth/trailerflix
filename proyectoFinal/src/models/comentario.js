const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Comentario = sequelize.define('Comentario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_cartelera: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'cartelera',
            key: 'id'
        }
    },
    texto_comentario: {
        type: DataTypes.TEXT
    },
        calificacion: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 10
            }
        }
    }, {
    tableName: 'comentario',
    timestamps: false
});

module.exports = Comentario;
