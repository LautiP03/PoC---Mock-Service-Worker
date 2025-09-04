// src/App.jsx
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState(null); 
  const [status, setStatus] = useState('loading');
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

    } catch (err) {
      setStatus('error');
      setError('Error de red al intentar conectar.');
    }
  };

  useEffect(() => {
    // Al cargar la página por primera vez, haz la petición al endpoint por defecto
    fetchUsers('https://mi-api.com/users'); 
  }, []);

  if (status === 'loading') {
    return <div>Cargando...</div>;
  }
  
  if (status === 'error') {
    return (
      <div>
        <h1>Prueba de Concepto de Mock Service Worker</h1>
        <p>Hubo un error: {error}</p>
        <button onClick={() => fetchUsers('https://mi-api.com/users')}>Reintentar</button>
      </div>
    );
  }
  
  return (
    <div className="App">
      <h1>Prueba de Concepto de Mock Service Worker</h1>
      <h2>Lista de Usuarios (datos simulados)</h2>
      <ul className="user-list">
        {/* Asegúrate de que `users` no sea nulo antes de mapear */}
        {users && users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <button onClick={() => fetchUsers('https://mi-api.com/users')}>Cargar usuarios</button>
      <button onClick={() => fetchUsers('https://mi-api.com/users-lento')}>Cargar lento</button>
      <button onClick={() => fetchUsers('https://mi-api.com/non-existent-resource')}>Cargar 404</button>
      <button onClick={() => fetchUsers('https://mi-api.com/server-error')}>Cargar 500</button>
    </div>
  );
}

export default App;