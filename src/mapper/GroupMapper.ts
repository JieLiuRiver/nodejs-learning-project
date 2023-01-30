import { GroupType } from '../types';

export default class GroupMapper {
    static toGroups(Groups: any[]) {
        return Groups.map((Group) => ({
            ...Group.dataValues
        }));
    }

    static toGroupWithPermission(group: Partial<GroupType>) {
        return {
            ...group,
            permissions: String(group.permissions)
        };
    }
}
