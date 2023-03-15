
import sequelize from '../data-access/sequelize';
import UserModel from './userModel';
import GroupModel from './groupModel';
import UserGroupModel from './UserGroupModel';


const asynModel = async () => {
    console.log('Sync all defined models to the DB...');
    await sequelize.sync();
};

asynModel();

UserModel.belongsToMany(GroupModel, { through: UserGroupModel, foreignKey: 'userid' });
GroupModel.belongsToMany(UserModel, { through: UserGroupModel, foreignKey: 'groupid' });

export default {
    UserModel,
    GroupModel
};
