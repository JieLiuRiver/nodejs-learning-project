
import sequelize from '@/data-access/sequelize';
import UserModel from './userModel';
import GroupModel from './groupModel';
import UserGroupModel from './UserGroupModel';


export const asynModel = async () => {
    console.log('Syncing all defined models to the DB...');
    await sequelize.sync();
};

UserModel.belongsToMany(GroupModel, { through: UserGroupModel, foreignKey: 'userid' });
GroupModel.belongsToMany(UserModel, { through: UserGroupModel, foreignKey: 'groupid' });

export default {
    UserModel,
    GroupModel
};
