import request from 'supertest';
import express from 'express';
import router from '../../router/userRouter';
import Controller from '../userController';
import jwtService from '../../services/jwtService';

jest.mock('../../controller/userController.ts', () => ({
    getUserById: jest.fn(),
    getUsers: jest.fn(),
    createUser: jest.fn(),
    doLogin: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn()
}));


const app = express();
app.use(express.json());
app.use('/', router);

jest.setTimeout(20000);

describe('userRouter', () => {
    let token = '';
    beforeEach(async () => {
        token = await jwtService.createToken({
            username: 'test01',
            password: '1234'
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('GET /', () => {
        it('should return user by id when authenticated', async () => {
            const mockUser = { id: '1', login: 'John Doe' };
            const mockUserId = '1';

            (Controller.getUserById as any).mockImplementation(async (req: any, res: any) => {
                if (req.query.userid === mockUserId) {
                    res.status(200).json(mockUser);
                } else {
                    res.status(403).send();
                }
            });

            const response = await request(app)
                .get('/')
                .query({ userid: mockUserId })
                .set('authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUser);
        });

        it('should return users when authenticated', async () => {
            const mockUsers = [{ id: '1', login: 'John Doe' }];
            (Controller.getUsers as any).mockImplementation(async (req: any, res: any) => {
                res.status(200).json(mockUsers);
            });

            const response = await request(app)
                .get('/list')
                .set('authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUsers);
        });

        it('should create user successfully when authenticated', async () => {
            const mockUser = { login: `John Doe ${ Date.now()}`, age: 23, password: '2234dhHhs@*&*2' };
            (Controller.createUser as any).mockImplementation(async (req: any, res: any) => {
                res.status(200).json({
                    userid: '8'
                });
            });

            const response = await request(app)
                .post('/register')
                .set('authorization', `Bearer ${token}`)
                .send(mockUser);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                userid: '8'
            });
        });

        it('should login successfully', async () => {
            const mockUser = { login: `John Doe ${ Date.now()}`, password: '2234dhHhs@*&*2' };
            (Controller.doLogin as any).mockImplementation(async (req: any, res: any) => {
                res.status(200).json({
                    token: 'fake token'
                });
            });

            const response = await request(app)
                .post('/login')
                .send(mockUser);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                token: 'fake token'
            });
        });

        it('should update user successfully', async () => {
            const mockUser = { id: '1', age: 32, password: '2234dhHhs@*&*2' };
            (Controller.updateUser as any).mockImplementation(async (req: any, res: any) => {
                res.status(200).json({
                    message: 'update ok',
                    status: 0
                });
            });

            const response = await request(app)
                .put('/')
                .set('authorization', `Bearer ${token}`)
                .send(mockUser);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: 'update ok',
                status: 0
            });
        });

        it('should remove user successfully', async () => {
            const mockUser = { id: '1' };
            (Controller.deleteUser as any).mockImplementation(async (req: any, res: any) => {
                res.status(200).json({
                    message: 'remove ok',
                    status: 0
                });
            });

            const response = await request(app)
                .delete('/')
                .set('authorization', `Bearer ${token}`)
                .send(mockUser);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: 'remove ok',
                status: 0
            });
        });
    });
});

