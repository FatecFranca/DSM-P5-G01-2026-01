const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: { // corresponde à coluna 'nome' no banco
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true
  },
  senha_hash: { // corresponde à coluna 'senha_hash' no banco
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'usuarios', // nome correto da tabela
  timestamps: true
});

module.exports = User;
