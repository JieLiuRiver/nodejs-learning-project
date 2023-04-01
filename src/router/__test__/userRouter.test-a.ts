import request from 'supertest';
import app from '@/server';
import Controllers from '../../controller';
import jwtServices from '@/services/jwtService';

const { UserController } = Controllers;
jest.setTimeout(20000);
describe('GET /', () => {
    it('should return user data with a valid token', async () => {
        const validToken = jwtServices.createToken({
            username: 'bode',
            password: '123456'
        });

        jest.spyOn(UserController, 'getUserById').mockResolvedValue();

        const res = await request(app)
            .get('/')
            .set('Authorization', `Bearer ${validToken}`);

        expect(res.status).toEqual(200);
        expect(res.body).toHaveProperty('id', 123);
        expect(res.body).toHaveProperty('username', 'Test User');
        expect(res.body).toHaveProperty('password', 'test@example.com');
    });
});
