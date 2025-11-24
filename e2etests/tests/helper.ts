import { Page } from '@playwright/test';

export const loginWith = async (page: Page, username: string, password: string) => {
  await page.goto('/login');
  await page.getByTestId('username').locator('input').fill(username); 
  await page.getByTestId('password').locator('input').fill(password);
  await page.getByRole('button', { name: /iniciar sesión/i }).click();
};

export const signIn = async (page: Page, rut: string, password: string, name: string, club: string, n_dorsal: string ) => {
    await page.getByTestId('rut').locator('input').fill(rut);
    await page.getByTestId('username').locator('input').fill(name);
    await page.getByTestId('club').locator('input').fill(club);
    await page.getByTestId('n_dorsal').locator('input').fill(n_dorsal);
    await page.getByTestId('password').locator('input').fill(password);
};

