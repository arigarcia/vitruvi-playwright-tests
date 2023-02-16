import { expect, Locator, Page } from '@playwright/test';

class DeleteModal {
    readonly page: Page;
    readonly heading: Locator;
    readonly message: Locator;
    readonly deleteButton: Locator;

    constructor(page: Page, contractorName: string) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Confirm Delete' });
        this.message = page.getByText(`Are you sure you want to delete ${contractorName}?`);
        this.deleteButton = page.getByRole('button', { name: 'Delete' });
    }

    async confirmDeletion() {
        await expect(this.heading).toBeVisible();
        await expect(this.message).toBeVisible();
        await this.deleteButton.click();
    }
}

class ContractorSidebar {
    readonly page: Page;
    readonly name: Locator;
    readonly code: Locator;
    readonly description: Locator;
    readonly phone1: Locator;
    readonly phone2: Locator;
    readonly email: Locator;
    readonly address1: Locator;
    readonly address2: Locator;
    readonly zipCode: Locator;
    readonly city: Locator;
    readonly region: Locator;
    readonly country: Locator;
    readonly saveButton: Locator;
    readonly deleteButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.name = page.getByLabel('Name*');
        this.code = page.getByLabel('Code*');
        this.description = page.getByLabel('Description');
        this.phone1 = page.getByLabel('Phone 1');
        this.phone2 = page.getByLabel('Phone 2');
        this.email = page.getByLabel('E-mail');
        this.address1 = page.getByLabel('Address 1');
        this.address2 = page.getByLabel('Address 2');
        this.zipCode = page.getByLabel('Zip/Postal Code');
        this.city = page.getByLabel('City');
        this.region = page.getByLabel('Region');
        this.country = page.getByLabel('Country');
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.deleteButton = page.getByRole('button', { name: 'Delete' });
    }

    async populate(contractor) {
        await this.name.fill(contractor.name);
        await this.code.fill(contractor.code);
        await this.description.fill(contractor.description);
        await this.phone1.fill(contractor.phone1);
        await this.phone2.fill(contractor.phone2);
        await this.email.fill(contractor.email);
        await this.address1.fill(contractor.address1);
        await this.address2.fill(contractor.address2);
        await this.zipCode.fill(contractor.zipcode);
        await this.city.fill(contractor.city);
        await this.region.fill(contractor.region);
        await this.country.fill(contractor.country);
    }

    async save() {
        await this.saveButton.click()
    }

    async containsCorrectInformation(contractor) {
        await expect(this.name).toHaveValue(contractor.name);
        await expect(this.code).toHaveValue(contractor.code);
        await expect(this.description).toHaveValue(contractor.description);
        await expect(this.phone1).toHaveValue(contractor.phone1);
        await expect(this.phone2).toHaveValue(contractor.phone2);
        await expect(this.email).toHaveValue(contractor.email);
        await expect(this.address1).toHaveValue(contractor.address1);
        await expect(this.address2).toHaveValue(contractor.address2);
        await expect(this.zipCode).toHaveValue(contractor.zipcode);
        await expect(this.city).toHaveValue(contractor.city);
        await expect(this.region).toHaveValue(contractor.region);
        await expect(this.country).toHaveValue(contractor.country);
    }

    async delete() {
        await this.deleteButton.click()
    }
}

export default class ContractorsPage {
    readonly page: Page;
    readonly expandButton: Locator;
    readonly addButton: Locator;
    readonly searchField: Locator;
    readonly rowActionsButton: Locator;
    readonly editButton: Locator;
    readonly sidebar: ContractorSidebar;
    deleteModal: DeleteModal;

    constructor(page: Page) {
        this.page = page;
        this.expandButton = page.locator('header').filter({ hasText: 'Contractors' }).getByTitle('Expand');
        this.addButton = page.locator('//*[@id="content"]/vit-contractor-page/div/div/vit-widget-grid-editable/section/header/div[2]/a[1]')
        this.searchField = page.getByRole('textbox', { name: 'Search' });

        this.rowActionsButton = page.locator('.actions-cell > .fa').first();
        this.editButton = page.getByText('Edit', { exact: true });
        this.sidebar = new ContractorSidebar(page);
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
        await expect(this.sidebar.name).toHaveValue(contractorName);
    }

    async confirmDelete(contractorName: string) {
        this.deleteModal = new DeleteModal(this.page, contractorName);
        await this.deleteModal.confirmDeletion();
    }
}