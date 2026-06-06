import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import waterDrop from '../assets/water-drop.png';

export default function LoginScreen({ loggedUser, setLoggedUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (data.user) {
        setLoggedUser(data.user);
        setMessage(`Bem-vindo, ${data.user.nome}!`); // usar 'nome'
      } else {
        setMessage(data.error || 'Erro ao logar.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Erro ao tentar logar.');
    }
  };

  return (
    <div>
      {/* Header fixo com login/logoff */}
      <header>
        {!loggedUser ? (
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <button
              type="button"
              className="secondary"
              onClick={() => navigate('/register')}
            >
              Registrar
            </button>
          </form>
        ) : (
          <div className="login-form">
            <button className="secondary" 
            onClick={() => {
              setLoggedUser(null);
              setEmail('');      // limpa email
              setPassword('');   // limpa senha}
              setMessage('');   // limpa a mensagem de boas-vindas
            }}
            >
              Logoff
            </button>
          </div>
        )}
      </header>

      {/* Conteúdo principal */}
      <div className="main-container">
        <img src={waterDrop} alt="Water Drop" style={{ width: '80px', marginBottom: '20px' }} />
        <h1>Classificador de Água</h1>

        {message && <p className="message">{message}</p>}

        {/* Botões extras após login */}
        {loggedUser && (
          <div className="actions">
            <button onClick={() => navigate('/consulta')}>Nova Consulta</button>
            <button onClick={() => navigate('/historico')}>Histórico de Consultas</button>
          </div>
        )}
      </div>
    </div>
  );
}
