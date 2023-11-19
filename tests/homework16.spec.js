import { test, expect } from '@playwright/test';

test.describe('Open guru website', () => {
    test('checking search', async ({ page }) => {
        await page.goto('https://www.guru99.com/');
        await page.getByLabel('View Search Form').click();
        await page.getByPlaceholder('Search …').fill('software');
        await page.getByPlaceholder('Search …').press('Enter');
        await expect (page.getByRole('heading', { name: 'Search Results' })).toBeVisible();
        await page.getByText('Relevance').first().click();
        await page.getByText('Date', { exact: true }).click();
        await page.getByLabel('Page 2').click();
        await page.locator('#kt-scroll-up').click();
        await page.locator('#gs_cb50').click();
    });

    test('checking Advertise with Us form', async ({ page }) => {
        await page.goto('https://www.guru99.com/');
        await page.getByRole('link', { name: 'Advertise with Us' }).click();
        await page.getByRole('heading', { name: 'Interested? Please contact us Below' }).click();
        await expect (page.frameLocator('#JotFormIFrame-71343670635456').getByText('Name*', { exact: true })).toBeVisible();
        await page.frameLocator('#JotFormIFrame-71343670635456').getByLabel('Name*', { exact: true }).click();
        await page.frameLocator('#JotFormIFrame-71343670635456').getByLabel('Name*', { exact: true }).fill('test user');
        await page.frameLocator('#JotFormIFrame-71343670635456').getByRole('button', { name: 'Submit' }).click();
        await expect (page.frameLocator('#JotFormIFrame-71343670635456').locator('#cid_9').getByText('This field is required.')).toBeVisible();
        await expect (page.frameLocator('#JotFormIFrame-71343670635456').locator('#cid_12').getByText('This field is required.')).toBeVisible();
        await expect (page.frameLocator('#JotFormIFrame-71343670635456').locator('#cid_6').getByText('This field is required.')).toBeVisible();
        await expect (page.frameLocator('#JotFormIFrame-71343670635456').getByText('There are errors on the form. Please fix them before continuing.')).toBeVisible();
    });

    test('checking Join our FREE Course form', async ({ page }) => {
        await page.goto('https://www.guru99.com/');
        await page.locator('#kt-info-box_b7d75a-43').getByRole('link', { name: 'Testing' }).click();
        await page.getByRole('button', { name: 'AGREE' }).click();
        await expect (page.getByText('Join our FREE Course')).toBeVisible();
        await page.locator('#awf_field-115776625', { exact: true }).click();
        await page.locator('#awf_field-115776625', { exact: true }).press('Enter');
        await expect (page.getByRole('heading', { name: 'Required Fields Are Missing' })).toBeVisible();
        await page.getByRole('link', { name: 'Return to the last page' }).click();
        await page.locator('#awf_field-115776625', { exact: true }).click();
        await page.locator('#awf_field-115776625', { exact: true }).fill('1111');
        await page.getByRole('button', { name: 'Submit' }).click();
        await expect (page.getByRole('heading', { name: 'Email Address Is Not Valid' })).toBeVisible();
    });
});