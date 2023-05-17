import { expect, Locator, Page } from '@playwright/test';

export default class DeleteModal {
    readonly page: Page;
    heading: Locator;
    message: Locator;
    deleteButton: Locator;

    constructor(page: Page) {
        this.page = page;
    }

    async confirmDeletion() {
        await expect(this.heading).toBeVisible();
        await expect(this.message).toBeVisible();
        await this.deleteButton.click();
    }
}