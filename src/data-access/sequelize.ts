import { Sequelize } from 'sequelize';
import CONFIG from '@/config';
import logger from '@/services/logService';

const { postgres } = CONFIG;

const sequelize = new Sequelize(
    `postgres://${postgres.user}:${postgres.password}@${postgres.host}:${postgres.port}/${postgres.database}`,
    {
        pool: {
            max: 100,
            acquire: 30000,
            idle: 10000
        }
    }
);

export const connectSequelize = async () => {
    try {
        await sequelize.authenticate();
        logger.info('Connection has been established successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
};

export default sequelize;
