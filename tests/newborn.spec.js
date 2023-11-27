const { test, expect } = require('@playwright/test');
const{ MainPageNewBorn } = require('./pages/MainPageNewBorn');
const { constants } = require('buffer');

test.describe('Verification steps for newborn website', () => {

    test.beforeEach(async({ page }) => {
        await page.goto('/');
    });

    test('check the state after open page', async ({ page })=>{
        await page.goto('/');
        await expect(page.locator('span.card-title').nth(0)).toBeVisible();
    });

    test('usage POM', async ({ page }) => {
        const mainpagenewborn = new MainPageNewBorn(page);
        mainpagenewborn.verifyLogoutVisible();
    });
});