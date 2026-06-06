const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./models/index');
const User = require('./models/User');
const Leitura = require('./models/Leitura'); // novo model

// Rotas
const userRoutes = require('./routes/userRoutes');
const leituraRoutes = require('./routes/leituraRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas principais
app.use('/api/users', userRoutes);       // CRUD de usuários
app.use('/api/leituras', leituraRoutes); // CRUD de leituras de água
app.use('/api/auth', authRoutes);        // login/registro
app.use('/api/admin', adminRoutes);      // rotas administrativas

// Conexão com banco
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com PostgreSQL estabelecida!');
    return sequelize.sync({ alter: true }); // sincroniza models com tabelas
  })
  .then(() => console.log('Banco sincronizado com Sequelize!'))
  .catch(err => console.error('Erro ao conectar/sincronizar:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
