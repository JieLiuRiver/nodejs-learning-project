import request from 'supertest';
import express from 'express';
import router from '@/router/groupRouter';
import Controller from '../../controller/groupController';
import jwtService from '../../services/jwtService';

jest.mock('../../controller/groupController.ts', () => ({
    createGroup: jest.fn(),
    getGroupById: jest.fn(),
    getGroups: jest.fn(),
    updateGroup: jest.fn(),
    deleteGroup: jest.fn(),
    updateGroupContainUsers: jest.fn()
}));


const app = express();
app.use(express.json());
app.use('/', router);

jest.setTimeout(20000);

describe('groupRouter', () => {
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
        it('should return group by id when authenticated', async () => {
            const mockGroup = { id: '1', login: 'John Doe' };
            const mockGroupId = '1';

            (Controller.getGroupById as any).mockImplementation(async (req: any, res: any) => {
                if (req.query.groupid === mockGroupId) {
                    res.status(200).json(mockGroup);
                } else {
                    res.status(403).send();
                }
            });

            const response = await request(app)
                .get('/')
                .query({ groupid: mockGroupId })
                .set('authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockGroup);
        });

        it('should return groups when authenticated', async () => {
            const mockGroups = [{ id: '1', name: 'group 1', permissions: ['READ'] }, { id: '2', name: 'group 2', permissions: ['READ'] }];
            (Controller.getGroups as any).mockImplementation(async (req: any, res: any) => {
                res.status(200).json(mockGroups);
            });

            const response = await request(app)
                .get('/list')
                .set('authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockGroups);
        });

        it('should create group successfully when authenticated', async () => {
            const mockGroup = {
                name: 'group 1',
                permissions: ['READ']
            };
            (Controller.createGroup as any).mockImplementation(async (req: any, res: any) => {
                res.status(200).json({
                    groupid: '1',
                    message: 'created successfully',
                    status: 0
                });
            });

            const response = await request(app)
                .post('/')
                .set('authorization', `Bearer ${token}`)
                .send(mockGroup);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                groupid: '1',
                message: 'created successfully',
                status: 0
            });
        });

        it('should update group successfully', async () => {
            const mockGroup = {
                id: '1',
                name: 'group 1',
                permissions: ['READ']
            };
            (Controller.updateGroup as any).mockImplementation(async (req: any, res: any) => {
                res.status(200).json({
                    message: 'update ok',
                    status: 0
                });
            });

            const response = await request(app)
                .put('/')
                .set('authorization', `Bearer ${token}`)
                .send(mockGroup);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: 'update ok',
                status: 0
            });
        });

        it('should remove group successfully', async () => {
            const mockUser = { groupid: '1' };
            (Controller.deleteGroup as any).mockImplementation(async (req: any, res: any) => {
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

        it('should update group-users successfully', async () => {
            const mockData = { groupid: '1', userids: ['1', '2'] };
            (Controller.updateGroupContainUsers as any).mockImplementation(async (req: any, res: any) => {
                res.status(200).json({
                    message: 'update successfully',
                    status: 0
                });
            });

            const response = await request(app)
                .put('/users')
                .set('authorization', `Bearer ${token}`)
                .send(mockData);

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: 'update successfully',
                status: 0
            });
        });
    });
});

