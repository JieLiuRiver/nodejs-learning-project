
import Models from '../../models'
import jwtServices from '../jwtService';
import md5Service from '../md5Service';
import UserService from '../userService';

const { UserModel } = Models

jest.mock('../../models', () => ({
  UserModel: {
    findAll: jest.fn().mockResolvedValue([{ id: '1', login: 'test-user' }]),
    findOne: jest.fn().mockResolvedValue({ id: '1', login: 'test-user' }),
    create: jest.fn().mockReturnValue({ dataValues: { id: 'id' } }),
    update: jest.fn().mockReturnValue(true),
  },
  GroupModel: {}
}));

describe('UserService', () => {
      let userService: typeof UserService;

      beforeEach(() => {
        userService = UserService
      });

    it('should return a list of users', async () => {
      const result = await userService.getUsers();
      expect(result).toEqual([{ id: '1', login: 'test-user' }]);
    });

    it('should return a user with the specified ID', async () => {
        const result = await userService.findUserById('1');
        expect(result).toEqual({ id: '1', login: 'test-user' });
    });
    
    describe('insertUser', () => {
    
        it('should insert a new user', async () => {
          const user ={
            login: 'testuser',
            password: 'testpass',
            age: 30,
            isDeleted: false,
          };
    
          const result = await UserService.insertUser(user);
          expect(result.status).toBe(0);
          expect(result.message).toBe('register successfully');
          expect(result).toHaveProperty('userid');
    
          const insertedUser = await UserModel.findOne({ where: { login: 'testuser' } });
          expect(insertedUser).toBeDefined();
          expect(insertedUser).toEqual({ id: '1', login: 'test-user' });
        });
    })

    describe('login', () => {
        it('should return a token when login is successful', async () => {
          jest.spyOn(UserModel, 'findOne').mockReturnValue({
            dataValues: {
              login: 'test',
              password: 'password',
            },
          } as any);
          
          jest.spyOn(md5Service, 'compareHash').mockReturnValue(Promise.resolve(true));
          
          jest.spyOn(jwtServices, 'createToken').mockReturnValue(Promise.resolve('token'));
          
          const result = await userService.login({ login: 'test', password: 'password' });
          
          expect(result.message).toEqual('login ok');
          expect(result.status).toBe(0);
        });
        
        it('should return an error when login is unsuccessful', async () => {
          jest.spyOn(UserModel, 'findOne').mockReturnValue(Promise.resolve(null));
          
          const result = await userService.login({ login: 'test', password: 'password' });
          
          expect(result).toEqual({
            status: -1,
            message: 'test is not exists.',
            token: ""
          });
        });
      });

    describe('updateUser', () => {
        it('should update the user when the update is successful', async () => {
          jest.spyOn(UserModel, 'findOne').mockReturnValue({
            dataValues: {
              id: 'id',
              login: 'test',
              password: 'password',
            },
          } as any);
          
          jest.spyOn(UserModel, 'update').mockReturnValue({
            dataValues: {
              id: 'id',
              login: 'updated',
              password: 'password',
            },
          } as any);
          
          const result = await userService.updateUser({ id: 'id', login: 'updated' });
          
          expect(result).toEqual({
            status: 0,
            message: 'update ok'
          });
        });

        it('should return an error when the user does not exist', async () => {
            jest.spyOn(UserModel, 'findOne').mockReturnValue(Promise.resolve(null));
            
            const result = await userService.updateUser({ id: 'id', login: 'test1' });
            
            expect(result).toEqual({
              status: -1,
              message: 'test1 is not exists.',
            });
        });
    })

    describe('removeUser', () => {
        it('should remove the user when the remove is successful', async () => {
          jest.spyOn(UserModel, 'findOne').mockReturnValue({
            dataValues: {
              id: 'id',
              login: 'test',
              password: 'password',
            },
          } as any);
          
          jest.spyOn(UserModel, 'update').mockReturnValue({affectedCount: 1} as any);
          
          const result = await userService.removeUser('testid');
          
          expect(result).toEqual({
            status: 0,
            message: 'remove ok'
          });
        });
    });

});
