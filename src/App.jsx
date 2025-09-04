// src/App.jsx
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState(null); 
  const [status, setStatus] = useState('loading');
  const [type, setType] = useState('');
  const [error, setError] = useState('');

  const fetchUsers = async (url) => {
    setStatus('loading');
    setError('');
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        setStatus('error');
        const errorData = await response.json();
        setError(errorData.error || `Error: ${response.status}`);
        return;
      }
      
      const data = await response.json();
      setUsers(data.users);
      setStatus('success');
      setType(data.type);

    } catch (err) {
      setStatus('error');
      setError('Error de red al intentar conectar.');
    }
  };

  useEffect(() => {
    // Al cargar la página por primera vez, haz la petición al endpoint por defecto
    fetchUsers('https://mi-api.com/home');}, []);

  if (status === 'loading') {
    return <div className="spinner-container">
            <div className="spinner"></div>
            <p>Cargando datos...</p>
          </div>;
  }
  
  if (status === 'error') {
    return (
      <div className="app-container">
        <header className="header">
          <h1 className="title">Prueba de Concepto de Mock Service Worker</h1>
          <p className="subtitle">Simulación de respuestas </p>
        </header>
        <div className="card error fade-in">
          <h2>❌ Hubo un error</h2>
          <p>{error}</p>
          <button onClick={() => fetchUsers('https://mi-api.com/home')} className="btn"> Inicio </button>
        </div>
      </div>
    );
  }
  if (status === 'success') {
    if(type === 'home'){
      return (
        <div className="app-container">
          <header className="header">
            <h1 className="title">Prueba de Concepto de Mock Service Worker</h1>
            <p className="subtitle">Simulación de respuestas </p>
          </header>
          <main className="main">
            <div className="btn-group">
              <button className="btn" onClick={() => fetchUsers("https://mi-api.com/users")}> Cargar usuarios </button>
              <button className="btn" onClick={() => fetchUsers("https://mi-api.com/users-lento")} > Carga de usuarios lenta (2s)
              </button>
              <button className="btn" onClick={() => fetchUsers("https://mi-api.com/non-existent-resource")} > Cargar error de servidor </button>
              <button className="btn" onClick={() => fetchUsers("https://mi-api.com/server-error")}> Cargar error usuarios </button>
            </div>
          </main>
        </div>
      );
    }  
    else if(type === 'userList'){
      return (
        <div className="app-container">
          <header className="header">
            <h1 className="title">Prueba de Concepto de Mock Service Worker</h1>
            <p className="subtitle">Simulación de respuestas </p>
          </header>
          <div className="card fade-in">
            <h2>👥 Lista de Usuarios (datos simulados)</h2>
            <ul className="user-list">
              {users.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
            <button onClick={() => fetchUsers('https://mi-api.com/home')} className="btn"> Inicio </button>
          </div>
        </div>
      );
    }
  }
}

export default App;