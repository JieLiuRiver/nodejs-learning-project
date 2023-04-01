import { Express } from 'express';
import createApp from '../server';
import request from 'supertest';

describe('server', () => {
    let app: Express;

    beforeAll(() => {
        app = createApp();
    });

    it('should return body code 0 for GET /api/v1/user/list', async () => {
        const response = await request(app).get('/api/v1/user/list');
        expect(response.body.code).toBe(0);
    });
});
