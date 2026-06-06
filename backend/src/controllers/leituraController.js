const Leitura = require('../models/Leitura');
const axios = require('axios');

module.exports = {
async criarLeitura(req, res) {
  try {
    const { ph, cloramina, turbidez, userId } = req.body;

    // Chama a API Python
    const response = await axios.post('http://localhost:5000/classificar', {
      ph,
      cloramina,
      turbidez,
    });

    const resultado = response.data.resultado;

    // Agora inclui o userId na criação
    const leitura = await Leitura.create({
      ph,
      cloramina,
      turbidez,
      resultado,
      userId
    });

    res.json(leitura);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar leitura' });
  }
},


  async listarLeituras(req, res) {
  try {
    const { userId } = req.query;

    // Se vier userId, filtra; senão retorna todas
    const leituras = userId
      ? await Leitura.findAll({ where: { userId } })
      : await Leitura.findAll();

    res.json(leituras);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar leituras' });
  }
}
}