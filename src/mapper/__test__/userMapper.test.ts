import userMapper from '@/mapper/userMapper';

const MOCK_USERS = [
    {
        login: 'user1',
        id: '1'
    },
    {
        login: 'user2',
        id: '2'
    }
];

describe('userMapper', () => {
    it('should return users after called toUsers function', () => {
        const users =  userMapper.toUsers([
            {
                dataValues: MOCK_USERS[0]
            },
            {
                dataValues: MOCK_USERS[1]
            }
        ]);
        expect(users).toEqual(MOCK_USERS);
    });
    it('should return user after called toUser function', () => {
        const user =  userMapper.toUser(
            {
                dataValues: MOCK_USERS[0]
            }
        );
        expect(user).toEqual(MOCK_USERS[0]);
    });
});
