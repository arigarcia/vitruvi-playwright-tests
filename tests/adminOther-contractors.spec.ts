import { test, expect } from '@playwright/test';
import { RequestBuilder } from '../utilities/requestUtility' 
import login from '../utilities/login'

import { ADD_CONTRACTOR, CONTRACTOR_TO_UPDATE, CONTRACTOR_UPDATED, CONTRACTOR_TO_DELETE } from '../data/admin/contractorsData';
import ContractorsPage from '../elements/admin/contractorsPage';

const API_ENDPOINT = '/api/v1/subcontractors/';
const WEB_URL = '/#/app/admin/contractor';

let apiRequest;

test.describe('Contractors test', () => {
    test.beforeAll(async ({ page }) => {
        apiRequest = await RequestBuilder.build(API_ENDPOINT);
        await login(page);
    })

    test.describe('Add contractor', () => {
        test.beforeAll(async() => {
            await apiRequest.searchAndDelete('name', ADD_CONTRACTOR.name)
        })

        test('Create new contractor', async ({ page }) => {
            const contractorsPage = new ContractorsPage(page);

            await contractorsPage.goto(WEB_URL);
            await contractorsPage.expand();
            
            await contractorsPage.add();
            await contractorsPage.sidebar.populate(ADD_CONTRACTOR);
            await contractorsPage.sidebar.save();
            await contractorsPage.recordVisibleInGrid(ADD_CONTRACTOR.name);
        
            await contractorsPage.editRecord(ADD_CONTRACTOR.name);
            
            await contractorsPage.sidebar.containsCorrectInformation(ADD_CONTRACTOR);
        });
    })

    test.describe('Edit contractor', () => {
        test.beforeAll(async () => {
            await apiRequest.searchAndDelete('name', CONTRACTOR_TO_UPDATE.name)
            await apiRequest.searchAndDelete('name', CONTRACTOR_UPDATED.name)

            await apiRequest.post(CONTRACTOR_TO_UPDATE)
        })

        test('Edit contractor', async ({ page }) => {
            const contractorsPage = new ContractorsPage(page);

            await contractorsPage.goto(WEB_URL);
            await contractorsPage.expand();
            
            await contractorsPage.editRecord(CONTRACTOR_TO_UPDATE.name);

            await contractorsPage.sidebar.populate(CONTRACTOR_UPDATED);
            await contractorsPage.sidebar.save();
            await contractorsPage.editRecord(CONTRACTOR_UPDATED.name);

            await contractorsPage.editRecord(CONTRACTOR_UPDATED.name);
            await contractorsPage.sidebar.containsCorrectInformation(CONTRACTOR_UPDATED);
        });
    })

    test.describe('Delete contractor', () => {
        test.beforeAll(async () => {
            await apiRequest.searchAndDelete('name', CONTRACTOR_TO_DELETE.name);
            
            await apiRequest.post(CONTRACTOR_TO_DELETE)
        })

        test('Delete contractor', async ({ page }) => {
            const contractorsPage = new ContractorsPage(page);

            await contractorsPage.goto(WEB_URL);
            await contractorsPage.expand();

            await contractorsPage.editRecord(CONTRACTOR_TO_DELETE.name);

            await contractorsPage.sidebar.delete();
            await contractorsPage.confirmDelete(CONTRACTOR_TO_DELETE.name)
            await expect(contractorsPage.sidebar.name).toBeHidden();
        });
    })
})
