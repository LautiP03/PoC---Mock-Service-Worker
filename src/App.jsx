import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState(null); 
  const [status, setStatus] = useState('loading');
  const [type, setType] = useState('');
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [allowSearch, setAllowSearch] = useState(false); // bandera de búsqueda

  const fetchUsers = async (url, skipLoading = false, enableSearch = false) => {
    if (!skipLoading) {
      setStatus('loading');
    }
    setError('');
    setAllowSearch(enableSearch); // Aca se define si se habilita o no el buscador
    
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
    fetchUsers('https://mi-api.com/home');
  }, []);

  // LOADING 
  if (status === 'loading') {
    return (
      <div className="app-container">
        <header className="header">
          <h1 className="title">Prueba de Concepto de Mock Service Worker</h1>
          <p className="subtitle">Simulación de respuestas</p>
        </header>
        <div className="spinner-container">
          <div className="dual-ring"></div>
          <p className="loading-text">Cargando datos...</p>
        </div>
      </div>
    );
  }

  // SUCCESS
  if (status === 'success') {
    if(type === 'home'){
      return (
        <div className="app-container">
          <header className="header">
            <h1 className="title">Prueba de Concepto de Mock Service Worker</h1>
            <p className="subtitle">Simulación de respuestas</p>
          </header>
          <main className="main">
            <div className="btn-group">
              <button name='Cargar usuarios' className="btn" onClick={() => fetchUsers("https://mi-api.com/users", false, true)} > Cargar usuarios </button> 
              <button className="btn" onClick={() => fetchUsers("https://mi-api.com/users-lento", false, false)} > Carga de usuarios lenta (2s) </button>
              <button className="btn" onClick={() => fetchUsers("https://mi-api.com/non-existent-resource")} > Cargar error usuarios </button>
              <button className="btn" onClick={() => fetchUsers("https://mi-api.com/server-error")}> Cargar error de servidor </button>
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
            
            {allowSearch && ( 
              <input 
                type="text" 
                placeholder="Buscar usuario..." 
                className="search-input"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  fetchUsers(`https://mi-api.com/users?search=${e.target.value}`, true, true);
                }}
              />
            )}

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

  // ERROR
  if (status === 'error') {
    return (
      <div className="app-container">
        <header className="header">
          <h1 className="title">Prueba de Concepto de Mock Service Worker</h1>
          <p className="subtitle">Simulación de respuestas</p>
        </header>
        <div className="card error fade-in">
          <h2>⚠️ Ocurrió un error</h2>
          <p className="error-message">{error}</p>
          <button onClick={() => fetchUsers('https://mi-api.com/home')} className="btn"> Volver al inicio </button>
        </div>
      </div>
    );
  }
}

export default App;