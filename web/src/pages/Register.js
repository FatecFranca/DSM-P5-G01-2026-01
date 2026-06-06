import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import chefHat from '../assets/water-drop.png'

export default function Register({ setLoggedUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await response.json();

      if (data.user) {
        setLoggedUser(data.user);
        setMessage('Cadastro realizado com sucesso!');
        navigate('/'); // volta para home após registrar
      } else {
        setMessage(data.error || 'Erro ao registrar.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Erro ao tentar registrar.');
    }
  };

  return (
    <div className="main-container">
      {/* Header apenas com voltar */}
      <header className="header-consulta">
        <div className="left">
          <button className="secondary" onClick={() => navigate(-1)}>← Voltar</button>
        </div>
      </header>

      <img src={chefHat} alt="Chef Hat" style={{ width: '80px', marginBottom: '20px' }} />    
      <h2>Registrar</h2>
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrar</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
