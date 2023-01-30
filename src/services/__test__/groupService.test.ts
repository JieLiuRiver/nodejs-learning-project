import Models from '../../models';
import groupService from '../groupService';
import { EPermissionType } from '../../types/index';

const { GroupModel } = Models;

jest.mock('../../models', () => ({
    GroupModel: {
        findAll: jest.fn().mockResolvedValue([{ id: '1', name: 'test-group' }]),
        findOne: jest.fn().mockResolvedValue({ id: '1', login: 'test-group' }),
        create: jest.fn().mockReturnValue({ dataValues: { groupid: 'id' } }),
        update: jest.fn().mockReturnValue(true),
        destroy: jest.fn().mockReturnValue(true),
        findByPk: jest.fn().mockReturnValue({ setUsers: jest.fn() })
    },
    UserModel: {
        findAll: jest.fn().mockResolvedValue([{ id: '1', login: 'test-1' }])
    }
}));

describe('UserService', () => {
    it('should return a list of users', async () => {
        const result = await groupService.getGroups();
        expect(result).toEqual([{ id: '1', name: 'test-group' }]);
    });

    it('should return a group with the specified ID', async () => {
        const result = await groupService.findGroupById('1');
        expect(result).toEqual({ id: '1', login: 'test-group' });
    });

    it('should return group is already exist when create a new group with existing group', async () => {
        const result = await groupService.createGroup({
            name: 'Test Group',
            permissions: [EPermissionType.READ],
            userIds: ['user-id']
        });
        expect(result).toEqual({ status: -1, message: 'Test Group is already exist' });
    });

    describe('createGroup', () => {
        it('should create a new group', async () => {
            jest.spyOn(GroupModel, 'findOne').mockReturnValue(null as any);
            jest.spyOn(GroupModel, 'create').mockReturnValue(Promise.resolve({
                setUser: (users: any[], opt: any) => true,
                dataValues: {
                    id: '1'
                }
            }));
            const result = await groupService.createGroup({
                name: 'AA Group',
                permissions: [EPermissionType.READ],
                userIds: ['user-id']
            });
            console.log('result', result);
            expect(result).toEqual({ status: 0 });
        });
    });

    it('should update a group to contain a list of users', async () => {
        const result = await groupService.updateGroupContainUsers('group-id', ['user-id']);
        expect(result).toEqual({ status: 0, message: 'update successfully' });
        expect(GroupModel.findByPk).toHaveBeenCalledWith('group-id');
    });

    it('should delete a group', async () => {
        const result = await groupService.removeGroup('group-id');
        expect(result).toEqual({ status: 0, message: 'remove ok' });
    });
});
