// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

const users = [
  { id: 1, name: 'Juan Perez' },
  { id: 2, name: 'Ana Gomez' },
  { id: 3, name: 'Carlos Ruiz' },
  { id: 4, name: 'Lucia Martinez' },
];

export const handlers = [
  // Handler para simular una respuesta exitosa
  http.get('https://mi-api.com/home', () => {
    return HttpResponse.json(
      { type: 'home' },
      { status: 200 }
    );
  }),

  // Handler para lista de usuarios con búsqueda
  http.get('https://mi-api.com/users', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');

    let filteredUsers = users;
    if (search) {
      filteredUsers = users.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return HttpResponse.json(
      { type: 'userList', users: filteredUsers },
      { status: 200 }
    );
  }),

  // Handler para simular una respuesta lenta de 2 segundos
  http.get('https://mi-api.com/users-lento', () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          HttpResponse.json(
            {
              type: 'userList',
              users: [
                { id: 1, name: 'Juan Perez' },
                { id: 2, name: 'Ana Gomez' },
              ],
            },
            { status: 200 }
          )
        );
      }, 2000); // 2000ms = 2 segundos
    });
  }),

  // Handler para simular un 404
  http.get('https://mi-api.com/non-existent-resource', () => {
    return HttpResponse.json(
      { error: 'Usuario no encontrado' },
      { status: 404 }
    );
  }),

  // Handler para simular un 500
  http.get('https://mi-api.com/server-error', () => {
    return HttpResponse.json(
      { error: 'Algo salió mal en el servidor' },
      { status: 500 }
    );
  }),
];