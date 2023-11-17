const { test, expect } = require('@playwright/test');

test.describe('Open guru website', () => {

    test('Open the main page', async({ page }) => {
        await page.goto('https://www.guru99.com/');
        await expect(page.getByText('Tutorials Library'))
        .toBeVisible();
    });

    test('test', async ({ page }) => {
        await page.goto('https://www.guru99.com/');
        await expect(page.getByRole('heading', { name: 'SAP' }))
        .toBeVisible();
        await page.getByRole('link', { name: '➤ SAP Beginner' }).click();
        await page.getByRole('button', { name: 'AGREE' }).click();
    });

    test('test software', async ({ page }) => {
        await page.goto('https://www.guru99.com/');
        await page.getByRole('link', { name: '➤ Software Testing' }).click();
        await page.getByRole('button', { name: 'AGREE' }).click();
    });
});

