import Models from '../models';
import { User } from '../types';
import { toUsers } from '../helper/utils';

const { UserModel, GroupModel } = Models;
interface UserServiceResponse {
    status: 0 | -1
    message?: string
}

interface InsertResponse extends UserServiceResponse {
    userid?: string
}

class UserService {
    async getUsers(limit?: number, loginSubstring?: string) {
        try {
            const findResults = await UserModel.findAll({
                include: [
                    { model: GroupModel, attributes: ['id', 'name', 'permissions'] }
                ]
            });
            const users = toUsers(findResults);
            let avaibleUsers = users.filter((user) => !user.isDeleted);
            if (loginSubstring) {
                avaibleUsers = avaibleUsers.filter((user) => user.login.includes(loginSubstring));
            }
            if (typeof limit !== 'undefined') {
                avaibleUsers = avaibleUsers.slice(0, Number(limit));
            }
            return avaibleUsers;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async findUserById(id: string) {
        const findResult = await UserModel.findOne({
            where: {
                id
            }
        });
        return findResult;
    }

    async insertUser(user: Omit<User, 'id'>) {
        const result: InsertResponse = {
            status: 0
        };
        try {
            const users = await this.getUsers();
            const existUser = users.find((item) => item.login === user.login);
            if (existUser) {
                result.status = -1;
                result.message = `${user.login} is already exists.`;
                return result;
            }
            const createRes =  await UserModel.create(user as User);
            result.status = 0;
            result.message = 'insert ok';
            result.userid = createRes.dataValues.id;
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async updateUser(user: Pick<User, 'id'> & Partial<Omit<User, 'id'>>) {
        const result: UserServiceResponse = {
            status: 0
        };
        try {
            const findResult = await UserModel.findOne({ where: { id: user.id } });
            if (!findResult) {
                result.status = -1;
                result.message = `${user.login} is not exists.`;
                return result;
            }
            const row = JSON.parse(JSON.stringify(user));
            delete row.id;
            await UserModel.update(row, {
                where: { id: user.id }
            });
            result.status = 0;
            result.message = 'update ok';
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async removeUser(id: string): Promise<UserServiceResponse> {
        const result: UserServiceResponse = {
            status: 0
        };
        await UserModel.update({ isDeleted: true }, {
            where: {
                id
            }
        });
        result.status = 0;
        result.message = 'remove ok';
        return result;
    }
}

export default new UserService();

