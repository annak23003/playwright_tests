import { test, expect } from '@playwright/test';

test.use({
    locale: 'en-GB',
    timezoneId: 'Europe/London',
    geolocation: { longitude: 51.468587, latitude: -0.104373 },
    permissions: ['geolocation'],
});
  
test('my test with geolocation', async ({ page }) => {
    await page.goto('https://www.google.com/');
    await page.locator('#L2AGLb').click();
    await page.locator('#APjFqb').click();
    await page.locator('#APjFqb').fill('clothing store UK');
    await page.keyboard.press('Enter');
    await expect(page.getByRole('heading').getByText('United Kingdom')).toBeVisible();
    await page.screenshot({ path: 'screenshots/search_result.png', fullPage: false });
});