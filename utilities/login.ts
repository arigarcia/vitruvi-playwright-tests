import { expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', `${process.env.TEST_ENVIRONMENT}.env`) });

export default async (page) => {
    await page.goto('/');
        
    await page.locator('input[name="email"]').fill(process.env.EMAIL || '');
    await page.getByLabel('Password').fill(process.env.PASSWORD || '');
    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(page.locator('vit-admin-sidebar').getByRole('button', { name: process.env.USER_NAME }), 'Cannot find logged in user').toBeVisible();

    await page.getByTitle('Hide Map').locator('i').click();
}