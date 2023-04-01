import sequelize, { connectSequelize } from '../sequelize';
import logger from '@/services/logService';

describe('sequelize', () => {
    it('should connect to the database successfully', async () => {
        const authenticateSpy = jest.spyOn(sequelize, 'authenticate').mockResolvedValueOnce();
        const infoSpy = jest.spyOn(logger, 'info').mockImplementationOnce(() => {});
        await connectSequelize();
        expect(authenticateSpy).toHaveBeenCalled();
        expect(infoSpy).toHaveBeenCalledWith('Connection has been established successfully.');
    });

    it('should fail to connect to the database', async () => {
        const error = new Error('Connection failed');
        const authenticateSpy = jest.spyOn(sequelize, 'authenticate').mockRejectedValueOnce(error);
        const errorSpy = jest.spyOn(logger, 'error').mockImplementationOnce(() => {});
        await connectSequelize();
        expect(authenticateSpy).toHaveBeenCalled();
        expect(errorSpy).toHaveBeenCalledWith('Unable to connect to the database:', error);
    });
});
