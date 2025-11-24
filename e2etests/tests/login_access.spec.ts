import { test, expect } from '@playwright/test';
import { loginWith } from './helper';

test.describe('Login y Acceso Protegido', () => {

  const USER = {
    rut: '111111111',
    name: 'Usuario Test E2E',
    club: 'Club Testing',
    n_dorsal: 999,
    password: 'password123'
  };

  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset');
    await request.post('http://localhost:3001/api/cyclists', {
      data: USER
    });
    await page.goto('/');
  });

  test('Login con credenciales correctas', async ({ page }) => {
    await loginWith(page, USER.name, USER.password);
    await expect(page).toHaveURL(/^http:\/\/localhost:5173\/?$/);
    await expect(page.getByText(USER.name, { exact: false })).toBeVisible();
    await expect(page.getByText(/cerrar sesión/i)).toBeVisible();
  });

  test('Cyclist no puede acceder a /admin y es redirigido a al home', async ({ page }) => {
    await loginWith(page, USER.name, USER.password);
    await expect(page).toHaveURL(/^http:\/\/localhost:5173\/?$/);
    await page.goto('/admin');
    await expect(page).toHaveURL(/^http:\/\/localhost:5173\/?$/);
  });

  test('Login falla con contraseña incorrecta', async ({ page }) => {
    await loginWith(page, USER.name, 'wrongpass');
    await expect(page.getByText('invalid username or password')).toBeVisible();
  });

  test('Login redirije a crear una cuenta', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: /Regístrate aquí/i }).click();
    await expect(page).toHaveURL(/^http:\/\/localhost:5173\/sign-in\/?$/);
  })

});