const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Tag = sequelize.define('Tag', {
    id_tag: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tag: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
    }, {
        tableName: 'tag',
        timestamps: false
});

module.exports = Tag;
