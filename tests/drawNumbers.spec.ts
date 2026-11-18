import { test, expect } from '@playwright/test';

test('Should draw a number ', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.locator('input[name="count"]').click();
  await page.locator('input[name="count"]').fill('1');
  await page.getByRole('spinbutton', { name: 'Minimum number' }).click();
  await page.getByRole('spinbutton', { name: 'Minimum number' }).fill('10');
  await page.getByRole('spinbutton', { name: 'Maximum number' }).click();
  await page.getByRole('spinbutton', { name: 'Maximum number' }).fill('20');
  await page.getByRole('button', { name: 'Draw' }).click();
  await expect(page.getByRole('heading').filter({ hasText: /^\d+$/ })).toHaveCount(1);
});

test('Should draw 2 numbers without repeating', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.locator('input[name="count"]').click();
  await page.locator('input[name="count"]').fill('2');
  await page.getByRole('spinbutton', { name: 'Minimum number' }).click();
  await page.getByRole('spinbutton', { name: 'Minimum number' }).fill('10');
  await page.getByRole('spinbutton', { name: 'Maximum number' }).click();
  await page.getByRole('spinbutton', { name: 'Maximum number' }).fill('12');
  await page.getByRole('checkbox').click();
  await page.getByRole('button', { name: 'Draw' }).click();
  const numberHeadings = page.getByRole('heading').filter({ hasText: /^\d+$/ });
  await expect(numberHeadings).toHaveCount(2);
  const numbers = await numberHeadings.allTextContents();
  expect(new Set(numbers).size).toBe(2);
});
