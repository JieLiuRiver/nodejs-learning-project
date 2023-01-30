import Sequelize, { Model } from 'sequelize';
import sequelize from '../data-access/sequelize';
import { User } from '../types';
import { v1 as uuid } from 'uuid';

const Users = sequelize.define<Model<User>>('users', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuid
    },
    login: Sequelize.STRING(100),
    password: Sequelize.STRING(100),
    age: Sequelize.INTEGER,
    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false
});

export default Users;
