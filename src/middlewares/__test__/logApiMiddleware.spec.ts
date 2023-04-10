import logApiMiddleware from '../../middlewares/logApiMiddleware';
import ReqMapper from '../../mapper/reqMapper';
import log from '../../services/logService';

jest.mock('../../services/logService');

describe('logApiMiddleware', () => {
    it('should call log service with correct request info', () => {
        const req: any = {
            method: 'GET',
            url: '/api/v1/users'
        };
        const res: any = {};
        const next = jest.fn();
        const expectedApiInfo = ReqMapper.toServiceApiFromReq(req);

        logApiMiddleware(req, res, next);

        expect(log.info).toHaveBeenCalledWith(expectedApiInfo);
        expect(next).toHaveBeenCalled();
    });
});
