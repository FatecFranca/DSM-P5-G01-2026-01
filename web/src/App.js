import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen';
import Register from './pages/Register';
import ConsultaScreen from './pages/ConsultaScreen';   // ✅ nova página
import HistoricoScreen from './pages/HistoricoScreen'; // ✅ nova página
import './App.css';

function App() {
  const [loggedUser, setLoggedUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<LoginScreen loggedUser={loggedUser} setLoggedUser={setLoggedUser} />}
        />
        <Route
          path="/register"
          element={<Register setLoggedUser={setLoggedUser} />}
        />

        {/* Rotas novas para consultas */}
        <Route
          path="/consulta"
          element={<ConsultaScreen loggedUser={loggedUser} setLoggedUser={setLoggedUser} />}
        />

        <Route
          path="/historico"
          element={<HistoricoScreen loggedUser={loggedUser} setLoggedUser={setLoggedUser} />}
        />

      </Routes>
    </Router>
  );
}

export default App;
