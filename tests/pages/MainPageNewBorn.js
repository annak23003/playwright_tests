const { test, expect } = require('@playwright/test');

exports.MainPageNewBorn = class MainPageNewBorn {
    /**
     * @param {import('@playwright/test').Page} page
     */

    constructor(page) {
        this.page = page;
        this.logoutLink = page.locator('li > a.waves-effect', { hasText: 'Вийти'});
    }

    async verifyLogoutVisible() {
        await expect(this.logoutLink).toBeVisible();
    }
}