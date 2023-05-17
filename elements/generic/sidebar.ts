import { Locator, Page } from '@playwright/test';

export default class Sidebar {
    readonly page: Page;
    readonly header: Locator;
    readonly saveButton: Locator;
    readonly deleteButton: Locator;

    constructor(page: Page) {
        this.page = page;
    }

    async populate(entity) {}

    async containsCorrectInformation(entity) {}

    async save() {
        await this.saveButton.click()
    }

    async delete() {
        await this.deleteButton.click()
    }
}