import { render, screen, waitFor } from '@testing-library/react';
import { beforeAll, afterAll, afterEach, describe, test, expect } from 'vitest';
import { server } from './mocks/server';
import App from './App';

// 1. Configuración del servidor mock
// Antes de que todas las pruebas comiencen, inicia el servidor mock
beforeAll(() => server.listen());

// Después de cada prueba, reinicia los handlers
afterEach(() => server.resetHandlers());

// Después de que todas las pruebas hayan finalizado, detén el servidor mock
afterAll(() => server.close());

// 2. Escenarios de prueba
describe('App', () => {
  // Prueba el renderizado inicial y la carga de usuarios
  test('debería mostrar la lista de usuarios después de la carga inicial', async () => {
    // Renderiza el componente de la aplicación
    render(<App />);

    // Espera a que el componente cargue los datos y los muestre
    await waitFor(() => {
      // Verifica que el nombre de un usuario esté presente en el documento
      expect(screen.getByText('Nombre: Juan Perez')).toBeInTheDocument();
    });

    // También puedes verificar que el otro usuario esté presente
    expect(screen.getByText('Nombre: Ana Gomez')).toBeInTheDocument();
  });
});