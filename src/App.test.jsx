import { render, screen, waitFor } from '@testing-library/react';
import { beforeAll, afterAll, afterEach, describe, test, expect } from 'vitest';
import { server } from './mocks/server';
import App from './App';
import userEvent from '@testing-library/user-event';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('App', () => {
  test('Pantalla de carga inicial y carga de usuarios', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Prueba de Concepto de Mock Service Worker')).toBeInTheDocument();
    });
    
    const user = userEvent.setup();
    const loadUsersButton = screen.getByRole('button', { name: 'Cargar usuarios' });
    await user.click(loadUsersButton);
    await waitFor(() => {
      expect(screen.getByText('👥 Lista de Usuarios (datos simulados)')).toBeInTheDocument();
      expect(screen.getByText('Juan Perez')).toBeInTheDocument();
      expect(screen.getByText('Ana Gomez')).toBeInTheDocument();
      expect(screen.getByText('Carlos Ruiz')).toBeInTheDocument();
      expect(screen.getByText('Lucia Martinez')).toBeInTheDocument();
    });
  });
});