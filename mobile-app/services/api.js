const API_URL = "https://pidsm5.duckdns.org";

// --- Autenticação ---
export async function login(email, password) {
  console.log("Enviando body:", { email, password });
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return response.json(); // deve retornar { user: { id, name, email }, token }
}

export async function register(name, email, password) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return response.json();
}

// --- Consultas de potabilidade ---
export async function getConsultas(userId) {
  const response = await fetch(`${API_URL}/api/leituras?userId=${userId}`);
  return response.json(); // backend retorna um array direto
}

export async function createConsulta(consulta) {
  const response = await fetch(`${API_URL}/api/leituras`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(consulta),
  });
  return response.json();
}
