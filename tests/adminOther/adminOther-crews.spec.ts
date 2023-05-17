import { test, expect } from '@playwright/test';

import { RequestBuilder } from '../../utilities/requestUtility'
import login from '../../utilities/login' 
import CrewTypesPage from '../../elements/admin/crewTypesPage';
import { ADD_CREW_TYPE, CREW_TYPE_TO_UPDATE, CREW_TYPE_UPDATED, CREW_TYPE_TO_DELETE } from '../../data/admin/crewTypesData';

const API_ENDPOINT = '/api/v1/crew_categories/';
const WEB_URL = '/#/app/admin/crew';

let apiRequest;

test.describe('Crews Page test', () => {
    test.beforeAll(async () => {
        apiRequest = await RequestBuilder.build(API_ENDPOINT);
    })

    test.beforeEach(async ({ page }) => {
        await login(page);
    })

    test.describe('Navigate to the Crews page', () => {
        test('Navigate to Crews page', async ({ page }) => {
            await page.locator('body > vit-root > vit-layout > vit-menu-sidebar > div.menu-sidebar-container > footer > ul > vit-menu-item > li > a > span').click();
            await expect(page).toHaveURL('/#/app/admin/network_operator')

            await page.locator('body > vit-root > vit-layout > vit-menu-sidebar > vit-admin-sidebar > div > nav > ul > vit-menu-item:nth-child(4) > li > a > span').click();
            await expect(page).toHaveURL('/#/app/admin/crew')
            await expect(page.locator('body > vit-root > vit-layout > div > vit-navbar > nav > div > div.breadcrumbs-area > vit-breadcrumbs > ol > li')).toContainText('Crews');
        });
    })

    test.describe('Create new crew type', () => {
        test.beforeAll(async() => {
            await apiRequest.searchAndDelete('name', ADD_CREW_TYPE.name)
        })

        test('Create new crew type', async ({ page }) => {
            const crewTypesPage = new CrewTypesPage(page);

            await crewTypesPage.goto(WEB_URL);
            await crewTypesPage.expand();
            
            await crewTypesPage.add();
            await crewTypesPage.sidebar.populate(ADD_CREW_TYPE);
            await crewTypesPage.sidebar.save();
            await crewTypesPage.recordVisibleInGrid(ADD_CREW_TYPE.name);
        
            await crewTypesPage.editRecord(ADD_CREW_TYPE.name);
            
            await crewTypesPage.sidebar.containsCorrectInformation(ADD_CREW_TYPE);
        });
    })

    test.describe('Update crew type', () => {
        test.beforeAll(async() => {
            await apiRequest.searchAndDelete('name', CREW_TYPE_TO_UPDATE.name)
            await apiRequest.searchAndDelete('name', CREW_TYPE_UPDATED.name)

            await apiRequest.post(CREW_TYPE_TO_UPDATE)
        })

        test('Update crew type', async ({ page }) => {
            const crewTypesPage = new CrewTypesPage(page);

            await crewTypesPage.goto(WEB_URL);
            await crewTypesPage.expand();
            
            await crewTypesPage.editRecord(CREW_TYPE_TO_UPDATE.name);

            await crewTypesPage.sidebar.populate(CREW_TYPE_UPDATED);
            await crewTypesPage.sidebar.save();
            await crewTypesPage.editRecord(CREW_TYPE_UPDATED.name);

            await crewTypesPage.sidebar.containsCorrectInformation(ADD_CREW_TYPE);
            //await crewTypesPage.sidebar.containsCorrectInformation(CREW_TYPE_UPDATED);
        });
    })

    test.describe('Delete crew type', () => {
        test.beforeAll(async() => {
            await apiRequest.searchAndDelete('name', CREW_TYPE_TO_DELETE.name)

            await apiRequest.post(CREW_TYPE_TO_DELETE)
        })

        test('Delete crew type', async ({ page }) => {
            const crewTypesPage = new CrewTypesPage(page);

            await crewTypesPage.goto(WEB_URL);
            await crewTypesPage.expand();
            
            await crewTypesPage.editRecord(CREW_TYPE_TO_DELETE.name);

            await crewTypesPage.sidebar.delete();
            await crewTypesPage.confirmDelete(CREW_TYPE_TO_DELETE.name)
            await expect(crewTypesPage.sidebar.name).toBeHidden();
        });
    })
})
