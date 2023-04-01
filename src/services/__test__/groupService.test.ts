import groupService from '../groupService';
import Models from '@/models';
import { GroupType, EPermissionType } from '@/types';

jest.mock('@/models', () => {
    const mockGroupModel = {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    };
    const mockUserModel = {
        findAll: jest.fn()
    };
    return {
        UserModel: mockUserModel,
        GroupModel: mockGroupModel
    };
});

describe('GroupService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return all groups', async () => {
        const mockGroups: GroupType[] = [
            {
                id: '1',
                name: 'group1',
                permissions: [EPermissionType.READ]
            },
            {
                id: '2',
                name: 'group2',
                permissions: [EPermissionType.READ, EPermissionType.WRITE]
            },
            {
                id: '3',
                name: 'group3',
                permissions: [EPermissionType.READ, EPermissionType.WRITE, EPermissionType.DELETE]
            }
        ];
        (Models.GroupModel.findAll as any).mockResolvedValue(mockGroups);

        const result = await groupService.getGroups();
        expect(result).toEqual(mockGroups);
        expect(Models.GroupModel.findAll).toHaveBeenCalledTimes(1);
    });


    it('should return group info by id', async () => {
        const mockGroup = {
            id: '1',
            name: 'group1',
            permissions: [EPermissionType.READ]
        };
        (Models.GroupModel.findOne as any).mockResolvedValue(mockGroup);

        const result = await groupService.findGroupById('1');

        expect(result).toEqual(mockGroup);
        expect(Models.GroupModel.findOne).toHaveBeenCalledTimes(1);
        expect(Models.GroupModel.findOne).toHaveBeenCalledWith({
            where: { id: '1' },
            raw: true
        });
    });

    it('should create a new group and return the group ID', async () => {
        const mockGroup = {
            name: 'group5',
            permissions: [EPermissionType.READ],
            userIds: ['1']
        };
        const mockGroupWithId = {
            ...mockGroup,
            id: '5'
        };

        (Models.GroupModel.findOne as any).mockResolvedValue(false);
        (Models.GroupModel.findAll as any).mockResolvedValue([]);
        (Models.UserModel.findAll as any).mockResolvedValue([{
            id: '1',
            login: 'user1',
            password: 'password1',
            isDeleted: false,
            age: 20
        }]);
        (Models.GroupModel.create as any).mockResolvedValue({
            dataValues: {
                id: {
                    setUser: async () => true
                }
            }
        });

        const result = await groupService.createGroup(mockGroup);
        expect(result).toEqual({
            status: 0,
            message: 'created successfully',
            groupid: '5'
        });
        expect(Models.GroupModel.findOne).toHaveBeenCalledTimes(1);
        expect(Models.GroupModel.findAll).toHaveBeenCalledTimes(1);
        expect(Models.UserModel.findAll).toHaveBeenCalledTimes(1);
        expect(Models.GroupModel.create).toHaveBeenCalledTimes(1);
    });

    // it('should update user successfully', async () => {
    //     (Models.UserModel.findOne as any).mockResolvedValue(true);
    //     (Models.UserModel.update as any).mockResolvedValue();

    //     const result = await userService.updateUser({
    //         id: '2',
    //         age: 30
    //     });

    //     expect(result).toEqual({
    //         status: 0,
    //         message: 'update ok'
    //     });
    //     expect(Models.UserModel.findOne).toHaveBeenCalledTimes(1);
    //     expect(Models.UserModel.update).toHaveBeenCalledTimes(1);
    // });

    // it('should remove user successfully', async () => {
    //     (Models.UserModel.update as any).mockResolvedValue();

    //     const result = await userService.removeUser('1');

    //     expect(result).toEqual({
    //         status: 0,
    //         message: 'remove ok'
    //     });
    //     expect(Models.UserModel.update).toHaveBeenCalledTimes(1);
    // });
});
