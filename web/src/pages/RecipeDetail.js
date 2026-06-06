import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import chefHat from '../assets/chef-hat.png'

export default function RecipeDetail({ loggedUser, setLoggedUser }) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${id}`);
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        console.error(err);
        setMessage('Erro ao carregar receita.');
      }
    };
    fetchRecipe();
  }, [id]);

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
        setMessage(`Bem-vindo, ${data.user.name}!`);
      } else {
        setMessage(data.error || 'Erro ao logar.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Erro ao tentar logar.');
    }
  };

  const handleFavorite = async () => {
    try {
      if (!loggedUser) {
        setMessage('É necessário estar logado para favoritar.');
        return;
      }

      const userId = loggedUser.id || loggedUser._id || loggedUser.user_id;
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, recipe_id: recipe.id })
      });
      const data = await response.json();

      if (data.error) {
        setMessage(data.error);
      } else {
        setMessage('Receita favoritada com sucesso!');
      }
    } catch (err) {
      console.error(err);
      setMessage('Erro ao favoritar receita.');
    }
  };

  if (!recipe) return <p>Carregando receita...</p>;

  return (
    <div className="main-container">
      {/* Header com login igual à LoginScreen */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#007bff'
          }}
        >
          ← Voltar
        </button>

        {!loggedUser ? (
          <form onSubmit={handleLogin} className="login-form" style={{ display: 'flex', gap: '8px' }}>
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
            <p>Logado como: {loggedUser.name}</p>
            <button className="secondary" onClick={() => setLoggedUser(null)}>
              Logoff
            </button>
          </div>
        )}
      </header>

      <img src={chefHat} alt="Chef Hat" style={{ width: '80px', marginBottom: '20px' }} />  
      {/* Conteúdo da receita */}
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <p><strong>Ingredientes:</strong> {recipe.ingredients}</p>
      <p><strong>Modo de Preparo:</strong></p>
      <div style={{ whiteSpace: 'pre-line' }}>
        {recipe.instructions}
      </div>

      <button onClick={handleFavorite}>Favoritar</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
