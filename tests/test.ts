import { expect, test } from '@playwright/test';

test('main page has expected button', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
});
