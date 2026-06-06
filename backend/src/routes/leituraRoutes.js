const express = require('express');
const router = express.Router();
const leituraController = require('../controllers/leituraController');

// Criar nova leitura
router.post('/', leituraController.criarLeitura);

// Listar leituras
router.get('/', leituraController.listarLeituras);

module.exports = router;
