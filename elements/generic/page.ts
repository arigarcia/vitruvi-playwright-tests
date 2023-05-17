import { expect, Locator, Page } from '@playwright/test';
import DeleteModal from './deleteModal';
import Sidebar from './sidebar';

export default class VitruviPage {
    readonly page: Page;
    expandButton: Locator;
    addButton: Locator;
    searchField: Locator;
    rowActionsButton: Locator;
    editButton: Locator;
    sidebar: Sidebar;
    deleteModal: DeleteModal;

    constructor(page: Page) {
        this.page = page;
        this.searchField = page.getByRole('textbox', { name: 'Search' });
    }

    async goto(webURL: string) {
        await this.page.goto(webURL);
    }

    async expand() {
        await this.expandButton.click()
    }

    async add() {
        await this.addButton.click()
    }

    async recordVisibleInGrid(contractorName: string) {
        await expect(this.page.getByText(contractorName)).toBeVisible();
    }

    async editRecord(contractorName: string) {
        await this.searchField.fill(contractorName)
        await this.rowActionsButton.click();
        await this.editButton.click();
        await expect(this.sidebar.header).toHaveValue(contractorName);
    }

    async confirmDelete(contractorName: string) {
        this.deleteModal = new DeleteModal(this.page);
        await this.deleteModal.confirmDeletion();
    }
}