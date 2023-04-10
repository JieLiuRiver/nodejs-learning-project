import { GroupType } from '../types';

export const toUsers = (users: any[]) => {
    return users.map((user) => ({
        ...user.dataValues
    }));
};

export const toGroupWithPermission = (group: Partial<GroupType>) => {
    return {
        ...group,
        permissions: String(group.permissions)
    };
};

export const toGroups = (Groups: any[]) => {
    return Groups.map((Group) => ({
        ...Group.dataValues
    }));
};
