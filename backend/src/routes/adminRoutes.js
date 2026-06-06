const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Rota para listar todos os usuários
router.get('/users', adminController.getAllUsers);

// Rota para listar todas as leituras de água
router.get('/leituras', adminController.getAllLeituras);

module.exports = router;
