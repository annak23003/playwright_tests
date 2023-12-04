//ENV_URL=http://5.189.186.217 npx playwright test newborn.spec.js --headed --project chromium --trace on --workers=2  

const { test, expect } = require('@playwright/test');
const{ MainPageNewBorn } = require('./pages/MainPageNewBorn');
const { constants } = require('buffer');

test.describe('Verification steps for newborn website', () => {
    let categoryId;
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

    test.skip('check the state after open page', async ({ page })=>{
        await page.goto('/');
        await expect(page.locator('div.row span.card-title').nth(0)).toHaveText('Виручка:');
    });

    test.skip('usage POM', async ({ page }) => {
        const mainpagenewborn = new MainPageNewBorn(page);
        mainpagenewborn.verifyLogoutVisible();
    });

    test('Create a category', async ({ request, page }) => {
        const createCategoryResponse = await request.post('/api/category', {
          data: {
            name: 'NewCategory2',
          },
          headers: {
            'Accept': "application/json, text/plain, */*",
            'Authorization': `${USER.token}`,
          },
        });
        console.log('Response Status Code:', createCategoryResponse.status());
        console.log('Response Body:', await createCategoryResponse.text());
        expect(createCategoryResponse.ok()).toBeTruthy();
        const createdCategory = await createCategoryResponse.json();
        categoryId = createdCategory._id; // Store the category ID for deletion later
    });

    test('GET a category', async ({ request, page }) => {
        const getCategoryResponse = await request.get('/api/category', {
          headers: {
            'Accept': "application/json",
            'Authorization': `${USER.token}`,
          },
        });
        expect(getCategoryResponse.ok()).toBeTruthy();
        const categories = await getCategoryResponse.json();
        const createdCategoryExists = categories.some(category => category._id === categoryId);
        console.log('category ID', categoryId);
        expect(createdCategoryExists).toBeDefined();
        //Check if the created category is visible on the UI
        await page.goto('/categories/${categoryId}'); 
        await expect(page.locator("div.page-title > h4")).toBeVisible(); 
    });

    test('DELETE category', async ({ request, page }) => {
        const deleteCategoryResponse = await request.delete(`/api/category/${categoryId}`, {
          headers: {
            'Accept': "application/json",
            'Authorization': `${USER.token}`,
          },
        });
        console.log('Delete Category Response Status:', deleteCategoryResponse.status());
        console.log('Delete Category Response Body:', await deleteCategoryResponse.text());
        expect(deleteCategoryResponse.ok()).toBeTruthy();
    });
});