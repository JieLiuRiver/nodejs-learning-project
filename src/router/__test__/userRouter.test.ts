import request from 'supertest';
import express from 'express';
import router from '@/router/userRouter';
import Controllers from '../../controller';
import jwtServices from '../../services/jwtService';

jest.mock('../../services/jwtService', () => {
    return {
        verifyToken: jest.fn()
    };
});

jest.mock('../../controller', () => ({
    UserController: {
        getUserById: jest.fn()
    }
}));

const { UserController } = Controllers;

const app = express();

describe('userRouter', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('GET /', () => {
        it('should return user by id when authenticated', async () => {
            console.log('吗的', router);
            // Arrange
            const mockUser = { id: '1', name: 'John Doe' };
            const mockToken = 'fake-token';
            const mockUserId = '1';

            (jwtServices.verifyToken as any).mockImplementation((required: boolean) => (req: any, res: any, next: any) => {
                if (!required || req.headers.authorization === `Bearer ${mockToken}`) {
                    req.user = { id: mockUserId };
                    // eslint-disable-next-line callback-return
                    next();
                } else {
                    res.status(401).send();
                }
            });

            (UserController.getUserById as any).mockImplementation(async (req: any, res: any) => {
                if (req.user.id === mockUserId) {
                    res.json(mockUser);
                } else {
                    res.status(403).send();
                }
            });

            // app.use('/', router);

            // Act
            const response = await request(app)
                .get('/')
                .set('Authorization', `Bearer ${mockToken}`);

            // Assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUser);
        });
    });
});
