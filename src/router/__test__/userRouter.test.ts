// / <reference path="./type.d.ts" />

import createServer from '@/server';
import request from 'supertest';

import UserService from '@/services/userService';

const app = createServer();

let needAuthorize = false;

// jest.mock('../../models', async () => {
//     const SequelizeMock = require('sequelize-mock');
//     const dbMock = new SequelizeMock();
//     const UserMock = dbMock.define('User');
//     UserMock.$queueResult([{ id: 1, login: 'test', password: 'password' }]);
//     return { UserModel: UserMock };
// });

jest.mock('../../services/userService', () => {
    return {
        login: jest.fn().mockResolvedValue({
            token: 'mock-token',
            userid: '1'
        }),
        findUserById: jest.fn().mockResolvedValue({
            id: '1',
            login: 'Bode',
            password: '2234dhHhs@*&*2',
            age: 45,
            idDeleted: false
        }),
        getUsers: jest.fn().mockResolvedValue([
            {
                id: '1',
                login: 'Bode',
                password: '2234dhHhs@*&*2',
                age: 45,
                idDeleted: false
            },
            {
                id: '2',
                login: 'Jack',
                password: '2234dhHhs@*&*2',
                age: 25,
                idDeleted: false
            }
        ]),
        updateUser: jest.fn().mockResolvedValue({
            status: 0,
            message: 'update ok'
        }),
        insertUser: jest.fn().mockRejectedValue({
            status: 0,
            message: 'created ok',
            data: {
                userid: '1'
            }
        }),
        removeUser: jest.fn().mockRejectedValue({
            status: 0,
            message: 'remove ok',
            data: null
        })
    };
});

jest.mock('../../services/jwtService.ts', () => {
    return {
        verifyToken: jest.fn().mockImplementation((bool: boolean = true) => async (req: any, res: any, next: any) => {
            if (needAuthorize && !req.headers.authorization) {
                res.status(401).json({
                    code: 0,
                    message: 'unauthorized'
                });
            }
            if (needAuthorize && req.headers.authorization) {
                res.status(403).json({
                    code: 0,
                    message: 'forbidden'
                });
            }
            next();
        })
    };
});

jest.mock('../../middlewares/validator/userValidator.ts', () => {
    return {
        createUser: jest.fn().mockImplementation((req: any, res: any, next: any) => {
            next();
        }),
        doLogin: jest.fn().mockImplementation((req: any, res: any, next: any) => {
            next();
        }),
        updateUser: jest.fn().mockImplementation((req: any, res: any, next: any) => {
            next();
        }),
        removeUser: jest.fn().mockImplementation((req: any, res: any, next: any) => {
            next();
        })
    };
});

describe('auth', () => {
    beforeEach(() => {
        needAuthorize = true;
    });
    afterEach(() => {
        needAuthorize = false;
    });

    it('GET /api/v1/user =>  should return 401 unauthorized without token', async () => {
        const response = await request(app)
            .get('/api/v1/user?userid=1')
            .set('Accept', 'application/json');
        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            code: 0,
            message: 'unauthorized'
        });
    });

    it('GET /api/v1/user =>  should return 403 forbidden when token is expired', async () => {
        const response = await request(app)
            .get('/api/v1/user?userid=1')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer mocktoken');
        expect(response.status).toBe(403);
        expect(response.body).toEqual({
            code: 0,
            message: 'forbidden'
        });
    });
});

describe('User controller', () => {
    // How to solve it:
    // thrown: "Exceeded timeout of 5000 ms for a test.
    // Use jest.setTimeout(newTimeout) to increase the timeout value, if this is a long-running test."
    // it('should create a new user', async () => {
    //     const user = {
    //         login: 'Bode',
    //         password: '2234dhHhs@*&*2',
    //         age: 45
    //     };
    //     jest.setTimeout(20000)
    //     const response = await request(app)
    //         .post('/api/v1/user/register')
    //         .send(user);
    //     expect(response.status).toBe(200);
    // });

    it('GET /api/v1/user/login => should login successfully', async () => {
        (UserService.login as jest.Mock).mockResolvedValue({
            token: 'mock-token',
            userid: '1'
        });
        const response = await request(app)
            .post('/api/v1/user/login')
            .send({
                login: 'Bode',
                password: '2234dhHhs@*&*2',
                age: 45
            });
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual({
            token: 'mock-token',
            userid: '1'
        });
    });

    it('GET /api/v1/user =>  should return user successfully', async () => {
        const response = await request(app)
            .get('/api/v1/user?userid=1')
            .set('Accept', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual({
            login: 'Bode',
            age: 45,
            id: '1'
        });
    });

    it('GET /api/v1/user/list => should return users successfully', async () => {
        const result = await request(app)
            .get('/api/v1/user/list')
            .set('Accept', 'application/json');
        expect(result.statusCode).toBe(200);
        expect(result.body.code).toBe(0);
        expect(result.body.data).toEqual([
            {
                id: '1',
                login: 'Bode',
                age: 45
            },
            {
                id: '2',
                login: 'Jack',
                age: 25
            }
        ]);
    });

    it('PUT /api/v1/user =>  should update user info successfully', async () => {
        const result = await request(app)
            .put('/api/v1/user')
            .send({
                id: '1',
                age: 25
            })
            .set('Accept', 'application/json');
        expect(result.statusCode).toBe(200);
        expect(result.body).toEqual({
            code: 0,
            message: 'update ok',
            data: null
        });
    });

    // How to solve it:
    // thrown: "Exceeded timeout of 5000 ms for a test.
    // Use jest.setTimeout(newTimeout) to increase the timeout value, if this is a long-running test."
    // it('DELETE /api/v1/user =>  should remove user successfully', async () => {
    //     const result = await request(app)
    //         .delete('/api/v1/user')
    //         .send({
    //             userid: '1'
    //         })
    //         .set('Accept', 'application/json');
    //     expect(result.statusCode).toBe(200);
    //     expect(result.body).toEqual({
    //         code: 0,
    //         message: 'remove ok',
    //         data: null
    //     });
    // });
});
