import { User } from '../../types';
import userService from '../userService';
import jwtService from '../jwtService';
import md5Service from '../md5Service';
import Models from '../../models';

jest.mock('@/models', () => {
    const mockUserModel = {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    };
    const mockGroupModel = {};
    return {
        UserModel: mockUserModel,
        GroupModel: mockGroupModel
    };
});

jest.mock('../md5Service', () => {
    return {
        createHash: jest.fn(),
        compareHash: jest.fn()
    };
});
jest.mock('../jwtService', () => {
    return {
        createToken: jest.fn()
    };
});

describe('UserService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return all users', async () => {
        const mockUsers: User[] = [
            {
                id: '1',
                login: 'user1',
                password: 'password1',
                isDeleted: false,
                age: 20
            },
            {
                id: '2',
                login: 'user2',
                password: 'password2',
                isDeleted: false,
                age: 22
            }
        ];
        (Models.UserModel.findAll as any).mockResolvedValue(mockUsers as any);

        const result = await userService.getUsers();

        expect(result).toEqual(mockUsers);
        expect(Models.UserModel.findAll).toHaveBeenCalledTimes(1);
        expect(Models.UserModel.findAll).toHaveBeenCalledWith({
            include: [{ model: Models.GroupModel, attributes: ['id', 'name', 'permissions'] }],
            raw: true
        });
    });

    it('should return the user if it exists', async () => {
        const mockUser = {
            id: '1',
            login: 'user1',
            password: 'password1',
            isDeleted: false
        };
        (Models.UserModel.findOne as any).mockResolvedValue(mockUser);
        const result = await userService.findUserById('1');

        expect(result).toEqual(mockUser);
        expect(Models.UserModel.findOne).toHaveBeenCalledTimes(1);
        expect(Models.UserModel.findOne).toHaveBeenCalledWith({
            where: { id: '1' },
            raw: true
        });
    });

    it('should insert a new user and return the user ID', async () => {
        const mockUser = {
            login: 'user3',
            password: 'password3',
            firstName: 'John',
            lastName: 'Doe',
            age: 20,
            isDeleted: false
        };
        const mockUserWithId = {
            ...mockUser,
            id: '3'
        };
        (Models.UserModel.create as any).mockResolvedValue({
            dataValues: mockUserWithId
        });
        (md5Service.createHash as any).mockReturnValue('hashedPassword');

        const result = await userService.insertUser(mockUser);

        expect(result).toEqual({
            status: 0,
            message: 'register successfully',
            userid: '3'
        });
        expect(Models.UserModel.create).toHaveBeenCalledTimes(1);
        expect(Models.UserModel.create).toHaveBeenCalledWith({
            ...mockUser,
            password: 'hashedPassword'
        });
        expect(md5Service.createHash).toHaveBeenCalledTimes(1);
        expect(md5Service.createHash).toHaveBeenCalledWith('password3');
    });

    it('should update user successfully', async () => {
        (Models.UserModel.findOne as any).mockResolvedValue(true);
        (Models.UserModel.update as any).mockResolvedValue();

        const result = await userService.updateUser({
            id: '2',
            age: 30
        });

        expect(result).toEqual({
            status: 0,
            message: 'update ok'
        });
        expect(Models.UserModel.findOne).toHaveBeenCalledTimes(1);
        expect(Models.UserModel.update).toHaveBeenCalledTimes(1);
    });

    it('should remove user successfully', async () => {
        (Models.UserModel.update as any).mockResolvedValue();

        const result = await userService.removeUser('1');

        expect(result).toEqual({
            status: 0,
            message: 'remove ok'
        });
        expect(Models.UserModel.update).toHaveBeenCalledTimes(1);
    });

    it('should login successfully', async () => {
        (Models.UserModel.findOne as any).mockResolvedValue({
            password: 'password2',
            id: '2'
        });
        (md5Service.compareHash as any).mockReturnValue(true);
        (jwtService.createToken as any).mockReturnValue('mock token');

        const result = await userService.login({
            password: 'password2',
            login: 'login2'
        });

        expect(result).toEqual({
            status: 0,
            message: 'login ok',
            token: 'mock token',
            userid: '2'
        });
        expect(Models.UserModel.findOne).toHaveBeenCalledTimes(1);
        expect(md5Service.compareHash).toHaveBeenCalledTimes(1);
        expect(jwtService.createToken).toHaveBeenCalledTimes(1);
    });
});
