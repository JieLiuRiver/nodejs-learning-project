import createServer from '@/server';
import request from 'supertest';

const app = createServer();

jest.mock('../../services/jwtService.ts', () => {
    return {
        verifyToken: jest.fn().mockImplementation((bool = true) => (req: any, res: any, next: any) => {
            next();
        })
    };
});


jest.mock('../../services/groupService.ts', () => {
    return {
        createGroup: jest.fn().mockResolvedValue({
            message: 'created successfully',
            groupid: '1',
            status: 0
        }),
        findGroupById: jest.fn().mockResolvedValue({
            name: 'test group',
            id: 'testid'
        }),
        getGroups: jest.fn().mockResolvedValue([
            { name: 'groupd 1', id: '1' },
            { name: 'groupd 2', id: '2' }
        ]),
        updateGroup: jest.fn().mockResolvedValue({
            status: 0,
            message: 'updated ok'
        }),
        updateGroupContainUsers:  jest.fn().mockResolvedValue({
            status: 0,
            message: 'updated ok'
        })
    };
});

describe('Group Authorization API', () => {
    it('POST /api/v1/group =>  should create group info successfully', async () => {
        const response = await request(app)
            .post('/api/v1/group')
            .send({
                name: `Group _${Date.now()}`,
                permissions: [
                    'READ', 'SHARE', 'WRITE', 'DELETE'
                ],
                userIds: []
            })
            .set('Accept', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: 'created successfully',
            code: 0,
            data: {
                groupid: '1'
            }
        });
    });

    it('GET /api/v1/group =>  should return group successfully', async () => {
        const response = await request(app)
            .get('/api/v1/group?groupid=1')
            .set('Accept', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual({
            name: 'test group',
            id: 'testid'
        });
    });

    it('GET /api/v1/group/list =>  should return groups successfully', async () => {
        const response = await request(app)
            .get('/api/v1/group/list')
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toEqual([
            { name: 'groupd 1', id: '1' },
            { name: 'groupd 2', id: '2' }
        ]);
    });

    it('PUT /api/v1/group => should update group info successfully', async () => {
        const response = await request(app)
            .put('/api/v1/group')
            .send({
                id: '1',
                permissions: ['READ', 'WRITE', 'SHARE']
            })
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            code: 0,
            message: 'updated ok',
            data: null
        });
    });

    it('PUT /api/v1/group/users =>  should update group users successfully', async () => {
        const response = await request(app)
            .put('/api/v1/group/users')
            .send({
                groupid: '1',
                userids: ['1']
            })
            .set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            code: 0,
            message: 'updated ok',
            data: null
        });
    });
});
