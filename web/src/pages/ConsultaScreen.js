import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import waterDrop from '../assets/water-drop.png';

export default function ConsultaScreen({ loggedUser, setLoggedUser }) {
  const [ph, setPh] = useState('');
  const [turbidez, setTurbidez] = useState('');
  const [cloramina, setCloramina] = useState('');
  const [message, setMessage] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [resultadoConsulta, setResultadoConsulta] = useState(null);
  const navigate = useNavigate();

  const handleConsulta = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/leituras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ph, cloramina, turbidez, userId: loggedUser.id })
      });
      const data = await response.json();

      if (data.consulta || data.id) {
        // pega o resultado da consulta
        setResultadoConsulta(data.resultado || data.consulta?.resultado);
        setPopupVisible(true);

        // limpa os campos
        setPh('');
        setCloramina('');
        setTurbidez('');
        setMessage('');
      } else {
        setMessage(data.error || 'Erro ao registrar consulta.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Erro de conexão com servidor.');
    }
  };

  return (
    <div>
      {/* Header com voltar e logoff */}
      <header className="header-consulta">
        <div className="left">
          <button className="secondary" onClick={() => navigate(-1)}>← Voltar</button>
        </div>
        <div className="right">
          <button
            className="secondary"
            onClick={() => {
              setLoggedUser(null);
              navigate('/'); // volta para a página inicial
            }}
          >
            Logoff
          </button>
        </div>
      </header>

      <div className="main-container consulta-container">
        <img src={waterDrop} alt="Water Drop" className="consulta-logo" />
        <h2>Nova Consulta</h2>

        <form onSubmit={handleConsulta} className="consulta-form">
          <input
            type="text"
            placeholder="pH (0 a 14)"
            value={ph}
            onChange={(e) => setPh(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Cloramina (0 - 4 mg/L)"
            value={cloramina}
            onChange={(e) => setCloramina(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Turbidez (0 - 100 NTU)"
            value={turbidez}
            onChange={(e) => setTurbidez(e.target.value)}
            required
          />
          <button type="submit" className="primary">Salvar Consulta</button>
        </form>

        {message && <p className="message">{message}</p>}

        {/* Popup de resultado */}
        {popupVisible && (
          <div className="popup">
            <div className="popup-content">
              <h3>Resultado da Consulta</h3>
              <p>{resultadoConsulta}</p>
              <button onClick={() => setPopupVisible(false)}>Fechar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
