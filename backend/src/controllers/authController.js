const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário e/ou senha incorretos' });
    }

    // Compara a senha digitada com o hash armazenado
    const isPasswordValid = await bcrypt.compare(password, user.senha_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Usuário e/ou senha incorretos' });
    }

    res.json({ message: 'Login realizado com sucesso!', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Criptografa a senha antes de salvar
    const senha_hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      nome: name,       // corresponde à coluna 'nome'
      email: email,
      senha_hash: senha_hash // corresponde à coluna 'senha_hash'
    });

    res.json({ message: 'Usuário cadastrado com sucesso!', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
