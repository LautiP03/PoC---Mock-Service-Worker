import { render, screen, waitFor } from '@testing-library/react';
import { beforeAll, afterAll, afterEach, describe, test, expect } from 'vitest';
import { server } from './mocks/server';
import App from './App';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('App', () => {
  test('debería mostrar la pantalla después de la carga inicial', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Prueba de Concepto de Mock Service Worker')).toBeInTheDocument();
    });

    expect(screen.getByText('Prueba de Concepto de Mock Service Worker')).toBeInTheDocument();
  });
});