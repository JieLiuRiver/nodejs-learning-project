import Sequelize, { Model } from 'sequelize';
import sequelize from '@/data-access/sequelize';
import { v1 as uuid } from 'uuid';

const UserGroup = sequelize.define<Model<{id: string, userid: string, groupid: string}>>('usersGroups', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuid,
        allowNull: false
    },
    userid: {
        type: Sequelize.INTEGER,
        allowNull:false,
        unique: 'usersGroup'
    },
    groupid:{
        type: Sequelize.INTEGER,
        unique: 'usersGroup',
        allowNull:false
    }
}, {
    timestamps: false
});

export default UserGroup;
