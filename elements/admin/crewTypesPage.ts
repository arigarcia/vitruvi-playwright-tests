import { expect, Locator, Page } from '@playwright/test';
import Sidebar from '../generic/sidebar';
import DeleteModal from '../generic/deleteModal';
import VitruviPage from '../generic/page';

class CrewTypeDeleteModal extends DeleteModal {
    constructor(page: Page, crewTypeName: string) {
        super(page);
        this.heading = page.getByRole('heading', { name: 'Confirm Delete' });
        this.message = page.getByText(`Are you sure you want to delete ${crewTypeName}?`);
        this.deleteButton = page.getByRole('button', { name: 'Delete' });
    }
}

class CrewTypeSidebar extends Sidebar {
    readonly page: Page;
    readonly name: Locator;
    readonly code: Locator;
    readonly leadRole: Locator;
    readonly selectedLeadRole: Locator;
    readonly description: Locator;
    readonly expandRolesList: Locator;
    readonly lists: Locator;
    readonly expandEquipmentTypeList: Locator;
    readonly defaultVelocity: Locator;
    readonly saveButton: Locator;
    readonly deleteButton: Locator;

    constructor(page: Page) {
        super(page);
        this.name = page.getByLabel('Name*');
        this.code = page.getByLabel('Code');
        this.leadRole = page.getByLabel('Lead Role*');
        this.selectedLeadRole = page.locator('#h-form > fieldset > div > div > div:nth-child(4) > div > vit-dynamic-form-field > div > div')
        this.description = page.getByLabel('Description');
        this.expandRolesList = page.locator('#roles > div.wj-template > div > div > span > button');
        this.expandEquipmentTypeList = page.locator('#equipment_categories > div.wj-template > div > div > span > button');
        this.lists = page.locator('#_dropdown > div.wj-control.wj-listbox.wj-content.wj-state-focused');
        this.defaultVelocity = page.getByLabel('Default Velocity');
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.deleteButton = page.getByRole('button', { name: 'Delete' });
    }

    async populate(crewType) {
        await this.name.fill('');
        await this.name.fill(crewType.name);
        await this.code.fill('');
        await this.code.fill(crewType.code);
        await this.leadRole.selectOption(crewType.leadRole);
        await this.description.fill('');
        await this.description.fill(crewType.description);
        await this.expandRolesList.click();
        await this.lists.getByText(crewType.roles[0]).check();
        await this.lists.getByText(crewType.roles[1]).check();
        await this.expandEquipmentTypeList.click();
        await this.lists.getByText(crewType.equipmentType[0]).check();
        await this.lists.getByText(crewType.equipmentType[1]).check();
        await this.defaultVelocity.fill('');
        await this.defaultVelocity.fill(crewType.defaultVelocity);
    }

    async containsCorrectInformation(crewType) {
        await expect(this.name).toHaveValue(crewType.name);
        await expect(this.code).toHaveValue(crewType.code);
        await expect(this.selectedLeadRole).toHaveAttribute('title', crewType.leadRole);
        await expect(this.description).toHaveValue(crewType.description);
        
        await this.expandRolesList.click()
        await expect(this.lists.getByText(crewType.roles[0]).locator('input')).toHaveAttribute('checked', '')
        await expect(this.lists.getByText(crewType.roles[1]).locator('input')).toHaveAttribute('checked', '')
        
        await this.expandEquipmentTypeList.click()
        await expect(this.lists.getByText(crewType.equipmentType[0]).locator('input')).toHaveAttribute('checked', '')
        await expect(this.lists.getByText(crewType.equipmentType[1]).locator('input')).toHaveAttribute('checked', '')
        await expect(this.defaultVelocity).toHaveValue(crewType.defaultVelocity);
    }
}

export default class CrewTypesPage extends VitruviPage {
    sidebar: CrewTypeSidebar;
    deleteModal: CrewTypeDeleteModal;

    constructor(page: Page) {
        super(page);
        this.expandButton = page.locator('header').filter({ hasText: 'Crew Types' }).getByTitle('Expand');
        this.addButton = page.locator('#content > vit-crew-page > div > vit-crew-category-grid > vit-widget-grid-editable > section > header > div.widget-controls > a:nth-child(2)')
        this.sidebar = new CrewTypeSidebar(page);
    }

    async recordVisibleInGrid(crewTypeName: string) {
        await expect(this.page.getByText(crewTypeName, { exact: true })).toBeVisible();
    }

    async editRecord(crewTypeName: string) {
        await this.searchField.fill(crewTypeName);
        await this.page.getByText(`${crewTypeName}`, { exact: true }).click();
        await expect(this.sidebar.name).toHaveValue(crewTypeName);
    }

    async confirmDelete(crewTypeName: string) {
        this.deleteModal = new CrewTypeDeleteModal(this.page, crewTypeName);
        await this.deleteModal.confirmDeletion();
    }
}