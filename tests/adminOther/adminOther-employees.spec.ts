import { test, expect } from '@playwright/test';
import { RequestBuilder } from '../../utilities/requestUtility' 
import login from '../../utilities/login'

import { COMPANY, ADD_EMPLOYEE, EMPLOYEE_TO_UPDATE, EMPLOYEE_UPDATED, EMPLOYEE_TO_DELETE, SUPERVISOR } from '../../data/admin/employeesData';
import EmployeesPage from '../../elements/admin/employeesPage';
import ContractorsPage from '../../elements/admin/contractorsPage';

const API_ENDPOINT = '/api/v1/users/';
const COMPANY_API_ENDPOINT = '/api/v1/subcontractors/';
const WEB_URL = '/#/app/admin/contractor';

let apiRequest, companyAPIRequest;

test.describe('Employees test', () => {
    test.beforeAll(async () => {
        apiRequest = await RequestBuilder.build(API_ENDPOINT);
        companyAPIRequest = await RequestBuilder.build(COMPANY_API_ENDPOINT);

        const subcontractorCompany = await companyAPIRequest.search(COMPANY.name)
        COMPANY.id = subcontractorCompany.results[0].id

        SUPERVISOR.company = COMPANY.id
        ADD_EMPLOYEE.company = COMPANY.id
        EMPLOYEE_TO_UPDATE.company = COMPANY.id
        EMPLOYEE_UPDATED.company = COMPANY.id
        EMPLOYEE_TO_DELETE.company = COMPANY.id
    })

    test.beforeEach(async ({ page }) => {
        await login(page);
    })

    test.describe('Add employee', () => {
        test.beforeAll(async () => {
            await apiRequest.searchAndDelete('email', ADD_EMPLOYEE.email)
        })

        test('Create new employee', async ({ page }) => {
            const contractorsPage = new ContractorsPage(page);
            const employeePage = new EmployeesPage(page);

            await employeePage.goto(WEB_URL);
            await contractorsPage.clickOnContractor(COMPANY.name)

            await employeePage.expand();
            
            await employeePage.add();
            await employeePage.sidebar.populate(ADD_EMPLOYEE);
            await employeePage.sidebar.save();
            await employeePage.recordVisibleInGrid(ADD_EMPLOYEE.email);
        
            await employeePage.clickRecordInGrid(ADD_EMPLOYEE);
            
            await employeePage.sidebar.containsCorrectInformation(ADD_EMPLOYEE);
        });
    })
})
