// models/reparto.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Reparto = sequelize.define('Reparto', {
  id_cartelera: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'cartelera',
      key: 'id'
    }
  },
  id_actor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'actores',
      key: 'id_actor'
    }
  }
}, {
  tableName: 'reparto',
  timestamps: false
});

module.exports = Reparto;
