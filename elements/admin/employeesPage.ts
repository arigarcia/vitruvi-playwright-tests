import { expect, Locator, Page } from '@playwright/test';
import Sidebar from '../generic/sidebar';
import DeleteModal from '../generic/deleteModal';
import VitruviPage from '../generic/page';

class ContractorDeleteModal extends DeleteModal {
    constructor(page: Page, contractorName: string) {
        super(page);
        this.heading = page.getByRole('heading', { name: 'Confirm Delete' });
        this.message = page.getByText(`Are you sure you want to delete ${contractorName}?`);
        this.deleteButton = page.getByRole('button', { name: 'Delete' });
    }
}

class EmployeeSidebar extends Sidebar {
    readonly employerSelected: Locator;
    readonly id: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly phone1: Locator;
    readonly phone2: Locator;
    readonly address1: Locator;
    readonly address2: Locator;
    readonly zipCode: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly country: Locator;
    readonly expandRolesList: Locator;
    readonly roles: Locator;
    readonly userTier: Locator;
    readonly division: Locator;
    readonly notes: Locator;
    readonly supervisor: Locator;
    readonly hourlyRate: Locator;
    readonly overtimeRate: Locator;
    readonly qualifications: Locator;
    readonly saveButton: Locator;
    readonly deleteButton: Locator;

    constructor(page: Page) {
        super(page);
        this.employerSelected = page.getByLabel('Employer*');
        this.id = page.getByLabel('ID');
        this.firstName = page.getByLabel('First Name*');
        this.lastName = page.getByLabel('Last Name*');
        this.email = page.getByLabel('E-mail*');
        this.phone1 = page.getByLabel('Phone 1');
        this.phone2 = page.getByLabel('Phone 2');
        this.address1 = page.getByLabel('Address 1');
        this.address2 = page.getByLabel('Address 2');
        this.zipCode = page.getByLabel('Zip/Postal Code');
        this.city = page.getByLabel('City');
        this.state = page.getByLabel('State/Province');
        this.country = page.getByLabel('Country');
        this.expandRolesList = page.locator('#roles').getByRole('button');
        this.userTier = page.getByRole('combobox', { name: 'User Tier*' });
        this.division = page.getByLabel('Division');
        this.notes = page.getByLabel('Notes');
        this.supervisor = page.getByRole('combobox', { name: 'Supervisor' });
        this.hourlyRate = page.locator('#hourly_rate').getByRole('textbox');
        this.overtimeRate = page.locator('#overtime_rate').getByRole('textbox');
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.deleteButton = page.getByRole('button', { name: 'Delete' });
    }

    async populate(employee) {
        await this.employerSelected.click();
        await this.page.getByRole('option', { name: employee.companyName }).click();
        
        await this.id.fill(employee.employee_id);
        await this.firstName.fill(employee.first_name);
        await this.lastName.fill(employee.last_name);
        await this.email.fill(employee.email);
        await this.phone1.fill(employee.phone1);
        await this.phone2.fill(employee.phone2);
        await this.address1.fill(employee.address1);
        await this.address2.fill(employee.address2);
        await this.zipCode.fill(employee.post_code);
        await this.city.fill(employee.city);
        await this.state.fill(employee.region);
        await this.country.fill(employee.country);
        await this.expandRolesList.click();
        await this.page.getByLabel(employee.roles[0]).check();
        await this.page.getByLabel(employee.roles[1]).check();
        await this.userTier.selectOption(employee.user_tier);
        await this.division.fill(employee.division);
        await this.notes.fill(employee.notes);
        await this.supervisor.selectOption(employee.supervisor);
        await this.hourlyRate.fill(employee.hourly_rate);
        await this.overtimeRate.fill(employee.overtime_rate);
    }

    async containsCorrectInformation(employee) {
        await expect(this.employerSelected).toHaveValue(employee.companyName);
        await expect(this.id).toHaveValue(employee.employee_id);
        await expect(this.firstName).toHaveValue(employee.first_name);
        await expect(this.lastName).toHaveValue(employee.last_name);
        await expect(this.email).toHaveValue(employee.email);
        await expect(this.phone1).toHaveValue(employee.phone1);
        await expect(this.phone2).toHaveValue(employee.phone2);
        await expect(this.address1).toHaveValue(employee.address1);
        await expect(this.address2).toHaveValue(employee.address2);
        await expect(this.zipCode).toHaveValue(employee.post_code);
        await expect(this.city).toHaveValue(employee.city);
        await expect(this.state).toHaveValue(employee.region);
        await expect(this.country).toHaveValue(employee.country);
        await this.expandRolesList.click()
        await expect(this.page.getByLabel(employee.roles[0])).toBeChecked()
        await expect(this.page.getByLabel(employee.roles[1])).toBeChecked()
        await expect(this.division).toHaveValue(employee.division);
        await expect(this.notes).toHaveValue(employee.notes);
        await expect(this.hourlyRate).toHaveValue(`$${employee.hourly_rate}`);
        await expect(this.overtimeRate).toHaveValue(`$${employee.overtime_rate}`);
    }
}

export default class EmployeesPage extends VitruviPage {
    sidebar: EmployeeSidebar;
    deleteModal: ContractorDeleteModal;

    constructor(page: Page) {
        super(page);
        this.expandButton = page.locator('//*[@id="content"]/vit-contractor-page/div/div[2]/vit-widget-grid-editable/section/header/div[2]/a[2]');
        this.addButton = page.locator('#content a').first();
        this.searchField = page.getByRole('textbox', { name: 'Search' });

        this.sidebar = new EmployeeSidebar(page);
    }

    async recordVisibleInGrid(value: string) {
        await expect(this.page.locator('.grid-editable-wrapper').getByText(value)).toBeVisible();
    }

    async clickRecordInGrid(employee) {
        await this.searchField.fill(employee.email)
        await this.page.getByText(`${employee.first_name} ${employee.last_name}`, { exact: true }).click();
        await expect(this.sidebar.email).toHaveValue(employee.email);
    }

    async confirmDelete(contractorName: string) {
        this.deleteModal = new ContractorDeleteModal(this.page, contractorName);
        await this.deleteModal.confirmDeletion();
    }
}