import Models from '@/models';
import { EPermissionType, GroupType } from '@/types';
import sequelize from '@/data-access/sequelize';
import { toGroupWithPermission, toGroups } from '../helper/utils';

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
            return toGroups(findResults);
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    async findGroupById(id: string) {
        const findResult = await GroupModel.findOne({
            where: {
                id
            },
            raw: true
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
            const { permissions, userIds, name } = group;

            const sameNameGroup = await GroupModel.findOne({
                where: {
                    name
                },
                raw: true
            });

            if (!!sameNameGroup) {
                result.status = -1;
                result.message = `${name} is already exist`;
                return result;
            }

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
            const groups = await this.getGroups();
            const existGroup = groups.find((item) => item.login === group.name);
            if (existGroup) {
                result.status = -1;
                result.message = `${group.name} is already exists.`;
                return result;
            }
            let groupid: string;
            await sequelize.transaction(async (t) => {
                const groupInstance: any =  await GroupModel.create(toGroupWithPermission(group) as any, { transaction: t });
                groupid = groupInstance.getDataValue('id');
                return await this.addUsersToGroup(groupInstance, userIds, t);
            });
            result.status = 0;
            result.message = 'created successfully';
            result.groupid = groupid!;
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    private async addUsersToGroup(groudModelInstance: any, userIds: string[], transaction: any): Promise<boolean> {
        if (Array.isArray(userIds) && userIds.length) {
            const users = await UserModel.findAll({ where: { id: userIds } });
            await groudModelInstance?.setUsers(users, { transaction });
            return true;
        }
        return false;
    }

    async updateGroupContainUsers(groupid: string, userids: string[]) {
        try {
            const result: GroupServiceResponse = {
                status: -1
            };
            await sequelize.transaction(async (t) => {
                const groudModelInstance = await GroupModel.findByPk(groupid);
                return await this.addUsersToGroup(groudModelInstance, userids, t);
            });
            result.status = 0;
            result.message = 'update successfully';
            return result;
        } catch (error) {
            console.log(error);
        }
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
            await GroupModel.update(toGroupWithPermission(row), {
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

