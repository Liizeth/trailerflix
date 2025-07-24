const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // tu conexión a la base

const Categoria = sequelize.define('Categoria', {
    id_categoria: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    categorias: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
    }, {
        tableName: 'categoria',
        timestamps: false
});

module.exports = Categoria;
