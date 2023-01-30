import server from '../server';
import request from 'supertest';

describe('server', () => {
  it('should return body code 0 for GET /api/v1/user/list', async () => {
    const app = server();
    const response = await request(app).get('/api/v1/user/list');
    expect(response.body.code).toBe(0);
  });
});
