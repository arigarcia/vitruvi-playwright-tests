import { FullConfig } from '@playwright/test';
import { apiLogin } from './utilities/requestUtility'

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', `${process.env.TEST_ENVIRONMENT}.env`) });

async function globalSetup(config: FullConfig) {
    await apiLogin();
}

export default globalSetup;