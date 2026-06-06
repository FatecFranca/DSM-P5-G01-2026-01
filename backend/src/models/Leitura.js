const { DataTypes } = require('sequelize');
const sequelize = require('../models/index'); // conexão já configurada

const Leitura = sequelize.define('Leitura', {
  ph: { type: DataTypes.FLOAT, allowNull: false },
  cloramina: { type: DataTypes.FLOAT, allowNull: false },
  turbidez: { type: DataTypes.FLOAT, allowNull: false },
  resultado: { type: DataTypes.STRING }, // 'Potável' ou 'Imprópria'
    userId: {
    type: DataTypes.INTEGER,
    allowNull: true
  } 
}, {
  tableName: 'leituras',
  timestamps: true,
});

module.exports = Leitura;
