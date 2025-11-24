import { test, expect } from '@playwright/test';
import { signIn } from './helper';

test.describe('Registro de Usuarios (Sign In)', () => {

  const USER = {
    rut: '222222222',
    name: 'Nuevo Ciclista',
    club: 'Club sign in',
    n_dorsal: '55', 
    password: 'password123'
  };

  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset');
    await page.goto('/sign-in');
  });

  test('Usuario puede registrarse exitosamente', async ({ page }) => {
    await signIn(page, USER.rut, USER.password, USER.name, USER.club, USER.n_dorsal);
    await page.getByRole('button', { name:'Crear Cuenta', exact: true }).click();
    await expect(page.getByText('Cuenta creada con éxito, ahora puedes iniciar sesión')).toBeVisible();
    await expect(page).toHaveURL(/login/);
  });

  test('Usuario intenta registrarse con datos ya registrados', async ({ page }) => {
    await signIn(page, USER.rut, USER.password, USER.name, USER.club, USER.n_dorsal);
    await page.getByRole('button', { name:'Crear Cuenta', exact: true }).click();
    await page.goto('/sign-in');
    await signIn(page, USER.rut, USER.password, USER.name, USER.club, USER.n_dorsal);
    await page.getByRole('button', { name:'Crear Cuenta', exact: true }).click();
    await expect(page.getByText('Rut ya registrado')).toBeVisible();
  });
});