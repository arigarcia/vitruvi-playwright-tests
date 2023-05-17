import { request, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', `${process.env.TEST_ENVIRONMENT}.env`) });

export const apiLogin = async() => {
    const req = await request.newContext({
        baseURL: `https://${process.env.TEST_ENVIRONMENT}.api.vitruvi.cc`,
    })

    const authenthicationData = await req.post('/auth/token/obtain', {
        form: {
            email: process.env.EMAIL || '',
            password: process.env.PASSWORD || ''
        }
    })

    process.env.TOKEN = JSON.parse(await authenthicationData.text())['token'];
}

export const findAndDelete = async (apiRequest, criteria, value, endpoint) => {
    const matchingRecords = await apiRequest.get(endpoint, {
        params: {
            search: value
        }
    })

    const results = JSON.parse(await matchingRecords.text())
    results['results'].forEach(async (record) => {
        console.log(record)
        if(record[criteria] === value) {
            await apiRequest.delete(`${endpoint}${record.id}`)
        }
    })
}

export class RequestBuilder {
    request;
    endpoint: string;

    constructor(request, endpoint) {
        this.request = request;
        this.endpoint = endpoint;
    }

    public static async build (endpoint) {
        const req = await request.newContext({
            baseURL: `https://${process.env.TEST_ENVIRONMENT}.api.vitruvi.cc`,
            extraHTTPHeaders: {
                'authorization': `JWT ${process.env.TOKEN}`
            }
        });
        return new RequestBuilder(req, endpoint)
    }

    post = async (params) => {
        const response = await this.request.post(this.endpoint, { data: params })
        await expect(response.ok(), `POST response [${response.status()}]: ${await response.body()}`).toBeTruthy();
        return response
    }

    search = async (criteria) => {
        const response = await this.request.get(this.endpoint, {
            params: {
                search: criteria
            }
        })
        await expect(response.ok(), `SEARCH GET response [${response.status()}]: ${await response.body()}`).toBeTruthy();
        return response.json()
    }

    delete = async (id) => {
        const response = await this.request.delete(`${this.endpoint}${id}`)
        console.log(`contractor ${id} deleted`)
        await expect(response.ok(), `DELETE response [${response.status()}]: ${await response.body()}`).toBeTruthy();
        return response
    }

    searchAndDelete = async (criteria, value) => {
        const results = await this.search(value)
        results['results'].forEach(async (record) => {
            console.log(record)
            if(record[criteria] === value) {
                await this.delete(record.id)
            }
        })
    }
    
}
