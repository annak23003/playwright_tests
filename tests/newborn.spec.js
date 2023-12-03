//ENV_URL=http://5.189.186.217 npx playwright test newborn.spec.js --headed --project chromium --trace on --workers=2  

const { test, expect } = require('@playwright/test');
const{ MainPageNewBorn } = require('./pages/MainPageNewBorn');
const { constants } = require('buffer');
//import { ApiHelper } from '../helpers/apiHelper'

test.describe('Verification steps for newborn website', () => {

    const USER = {
        email: 'email@dmytro.com',
        pwd: 'abc123',
        token: ''
    };

    test.beforeAll(async({request}) => {
        const response = await request.post(
            '/api/auth/login',{
            data: {
            email: USER.email,
            password: USER.pwd
            },
            headers: {
                "Content-Type": "application/json",
            },
        })
        expect(response.ok()).toBeTruthy()
        const body = await response.json()
        expect(body).toHaveProperty('token')
        USER.token = body.token
        console.log('AUTH', USER.token)
    });

    test.beforeEach(async ({page}) => {
        page.addInitScript((value) => {
            window.localStorage.setItem('auth-token', value)
        }, USER.token)
        await page.goto('/overview')
    });

    // test.beforeEach(async({ page }) => {
    //     await page.goto('/login');
    //     await page.getByLabel('Email:').fill('email@dmytro.com');
    //     await page.getByLabel('Пароль:').fill('abc123');
    //     await page.locator("button[type='submit']").click();
    //     await expect(page.locator('body > app-root > app-site-layout > ul > li.bold.last > a')).toBeVisible();
    //     await page.goto('/overview');
    // });

    test('check the state after open page', async ({ page })=>{
        await page.goto('/');
        await expect(page.locator('div.row span.card-title').nth(0)).toHaveText('Виручка:');
    });

    test('usage POM', async ({ page }) => {
        const mainpagenewborn = new MainPageNewBorn(page);
        mainpagenewborn.verifyLogoutVisible();
    });
});