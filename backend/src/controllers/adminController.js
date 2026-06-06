const User = require('../models/User');
const Leitura = require('../models/Leitura');

module.exports = {
  // Listar todos os usuários
  async getAllUsers(req, res) {
    try {
      const usuarios = await User.findAll();
      res.json(usuarios);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  },

  // Listar todas as leituras de água
  async getAllLeituras(req, res) {
    try {
      const leituras = await Leitura.findAll();
      res.json(leituras);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao listar leituras' });
    }
  }
};
