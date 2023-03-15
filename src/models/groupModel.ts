import Sequelize, { Model } from 'sequelize';
import sequelize from '../data-access/sequelize';
import { GroupType } from '../types';
import { v1 as uuid } from 'uuid';

const Group = sequelize.define<Model<
    Omit<GroupType, 'permissions'> & {
        permissions: string
    }
>>('group', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuid
    },
    name: {
        type: Sequelize.STRING
    },
    permissions: {
        type: Sequelize.STRING,
        defaultValue: ''
    }
}, {
    timestamps: false
});

export default Group;
