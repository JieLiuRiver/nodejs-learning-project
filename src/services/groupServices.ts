import Models from '../models';
import { EPermissionType, GroupType } from '../types';
import sequelize from '../data-access/sequelize';
import GroupMapper from '../mapper/GroupMapper';

const { GroupModel, UserModel } = Models;
interface GroupServiceResponse {
    status: 0 | -1
    message?: string
}

interface InsertResponse extends GroupServiceResponse {
    groupid?: string
}

class GroupService {
    async getGroups() {
        try {
            const findResults = await GroupModel.findAll({
                include: [
                    { model: UserModel, attributes: ['id', 'login'] }
                ]
            });
            return GroupMapper.toGroups(findResults);
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async findGroupById(id: string) {
        const findResult = await GroupModel.findOne({
            where: {
                id
            }
        });
        return findResult;
    }

    async createGroup(group: Omit<GroupType, 'id'> & {
        userIds: string[]
    }) {
        const result: InsertResponse = {
            status: 0
        };
        try {
            const { permissions, userIds } = group;
            if (!Array.isArray(permissions)) {
                result.status = -1;
                result.message = 'permissions is a array type';
                return result;
            }

            if (this.checkPermissionType(permissions)) {
                result.status = -1;
                result.message = `permissions only support types: ${Object.keys(EPermissionType)}`;
                return result;
            }
            const Groups = await this.getGroups();
            const existGroup = Groups.find((item) => item.login === group.name);
            if (existGroup) {
                result.status = -1;
                result.message = `${group.name} is already exists.`;
                return result;
            }
            let groupid: string;
            await sequelize.transaction(async (t) => {
                const createRes: any =  await GroupModel.create(GroupMapper.toGroupWithPermission(group) as any, { transaction: t });
                groupid = createRes.dataValues.id;
                return await this.addUsersToGroup(groupid, userIds, t);
            });
            result.status = 0;
            result.message = 'insert ok';
            result.groupid = groupid!;
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    private async addUsersToGroup(groupid: string, userIds: string[], transaction: any): Promise<boolean> {
        if (Array.isArray(userIds) && userIds.length) {
            const group: any = await GroupModel.findByPk(groupid);
            const users = await UserModel.findAll({ where: { id: userIds } });
            await group?.setUsers(users, { transaction });
            return true;
        }
        return false;
    }


    private checkPermissionType(permissions: GroupType['permissions']) {
        const isNotPerssionType = permissions.some((permission) => {
            return !Object.keys(EPermissionType).includes(permission);
        });
        return isNotPerssionType;
    }

    async updateGroup(group: Pick<GroupType, 'id'> & Partial<Omit<GroupType, 'id'>>) {
        const result: GroupServiceResponse = {
            status: 0
        };
        try {
            const findResult = await GroupModel.findOne({ where: { id: group.id } });
            if (!findResult) {
                result.status = -1;
                result.message = `${group.name} is not exists.`;
                return result;
            }

            if (!Array.isArray(group.permissions)) {
                result.status = -1;
                result.message = 'permissions is a array type';
                return result;
            }

            if (this.checkPermissionType(group.permissions)) {
                result.status = -1;
                result.message = `permissions only support types: ${Object.keys(EPermissionType)}`;
                return result;
            }

            const row: Partial<GroupType> = JSON.parse(JSON.stringify(group));
            delete row.id;
            await GroupModel.update(GroupMapper.toGroupWithPermission(row), {
                where: { id: group.id }
            });
            result.status = 0;
            result.message = 'update ok';
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async removeGroup(id: string): Promise<GroupServiceResponse> {
        const result: GroupServiceResponse = {
            status: 0
        };
        await GroupModel.destroy({
            where: {
                id
            }
        });
        result.status = 0;
        result.message = 'remove ok';
        return result;
    }
}

export default new GroupService();

