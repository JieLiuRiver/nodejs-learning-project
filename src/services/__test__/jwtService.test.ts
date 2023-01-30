import JWTServices from '@/services/jwtService';
import request from 'supertest';
import express from 'express';

describe('createToken', () => {
    it('should create a new JWT token', async () => {
        const userinfo = { username: 'bode', password: '123456' };
        const token = await JWTServices.createToken(userinfo);
        expect(token).toBeDefined();
      });
});


describe('verifyToken', () => {
    it('should return a 403 status code for an invalid JWT token', async () => {
        const app = express();
        app.use(JWTServices.verifyToken());
        app.get('/', (req, res) => res.sendStatus(200));
        const response = await request(app).get('/').set('Authorization', 'Bearer 123456');
        expect(response.status).toBe(403);
    });
    
    it('should return a 200 status code for a valid JWT token', async () => {
        const app = express();
        app.use(JWTServices.verifyToken());
        app.get('/', (req, res) => res.sendStatus(200));
        const userinfo = { username: 'bode', password: '123456' };
        const token = await JWTServices.createToken(userinfo);
        const response = await request(app).get('/').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
});