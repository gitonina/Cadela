import { test, expect } from '@playwright/test';
import { loginWith } from './helper';

test.describe('Admin: Crear circuitos y carreras', () => {
    const ADMIN = {
    name: 'Administrador E2E',
    password: 'adminpassword'
  };

  const CIRCUITO = {
    name: 'Circuito Test E2E',
    distance: '45',
    elevationGain: '1200'
  };

  test.beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset');
    await page.goto('/');
  });

  test('Admin logueado puede crear un circuito y una carrera', async ({ page }) => {
    await loginWith(page, ADMIN.name, ADMIN.password);
    await expect(page.getByText(/Has iniciado/i)).toBeVisible();
    await expect(page).toHaveURL(/^http:\/\/localhost:5173\/?$/);
    await page.goto('/admin');
    await page.getByTestId('circuit_name').locator('input').fill(CIRCUITO.name);
    await page.getByTestId('distance').locator('input').fill(CIRCUITO.distance);
    await page.getByTestId('elevation').locator('input').fill(CIRCUITO.elevationGain);
    await page.locator('form').getByRole('button', { name: 'CREAR CIRCUITO' }).click();
    await expect(page.getByText('¡Circuito creado exitosamente!')).toBeVisible();

    await page.getByRole('tab', { name: 'CREAR CARRERA' }).click();

    await page.getByText('Seleccionar Circuito').click();
    await page.getByRole('option', { name: CIRCUITO.name }).click();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 7);
    const day = String(tomorrow.getDate()).padStart(2, '0');
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const year = tomorrow.getFullYear();
    const fechaFuturaString = `${day}${month}${year}`;

    await page.getByRole('group', { name: 'Fecha de la carrera' }).click(); 
    await page.getByRole('group', { name: 'Fecha de la carrera' }).press('Control+a'); 
    await page.getByRole('group', { name: 'Fecha de la carrera' }).press('Backspace');
    await page.getByRole('group', { name: 'Fecha de la carrera' }).pressSequentially(fechaFuturaString, { delay: 100 });
  
    await page.locator('form').getByRole('button', { name: 'CREAR CARRERA' }).click();
    await expect(page.getByText('¡Carrera creada exitosamente!')).toBeVisible();
    
    await page.goto('/');
    await expect(page.getByText(CIRCUITO.name)).toBeVisible();
    await page.getByRole('button', { name: 'VER CALENDARIO DE CARRERAS' }).click();
    await expect(page).toHaveURL(/^http:\/\/localhost:5173\/calendar\/?$/);
    await expect(page.getByText(CIRCUITO.name)).toBeVisible();
    

  });

});