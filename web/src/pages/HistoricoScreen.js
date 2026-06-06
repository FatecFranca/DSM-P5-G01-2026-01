import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import waterDrop from '../assets/water-drop.png';

export default function HistoricoScreen({ loggedUser, setLoggedUser }) {
  const [consultas, setConsultas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchConsultas() {
      try {
        const response = await fetch('/api/leituras?userId=' + loggedUser.id);
        const data = await response.json();
        // Se o backend retorna um array direto, não precisa de data.consultas
        setConsultas(data.consultas || data);
      } catch (err) {
        console.error(err);
      }
    }

    if (loggedUser) {
      fetchConsultas();
    }
  }, [loggedUser]);

  return (
    <div>
      <header className="header-consulta">
        <div className="left">
          <button className="secondary" onClick={() => navigate(-1)}>← Voltar</button>
        </div>
        <div className="right">
          <button
            className="secondary"
            onClick={() => {
              setLoggedUser(null);
              navigate('/');
            }}
          >
            Logoff
          </button>
        </div>
      </header>

      <div className="main-container consulta-container">
        <img src={waterDrop} alt="Water Drop" className="consulta-logo" />
        <h2>Histórico de Consultas</h2>

        {consultas.length === 0 ? (
          <p className="message">Nenhuma consulta registrada ainda.</p>
        ) : (
          <table className="historico-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>pH</th>
                <th>Cloramina</th>
                <th>Turbidez</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {consultas.map((c, idx) => (
                <tr key={idx}>
                  <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td>{c.ph}</td>
                  <td>{c.cloramina}</td>
                  <td>{c.turbidez}</td>
                  <td>{c.resultado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
