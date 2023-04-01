import logExceptionMiddleware from '../logExceptionMiddleware';
import logService from '@/services/logService';

describe('logExceptionMiddleware', () => {
    const err = new Error('test error');
    const req: any = {};
    const res: any = {};
    const next = jest.fn();

    it('should call log.error and next with the error object', () => {
        logService.error = jest.fn();

        logExceptionMiddleware(err, req, res, next);

        expect(logService.error).toHaveBeenCalledWith(err);
        expect(next).toHaveBeenCalledWith(err);
    });

    it('should throw an error if log.error throws an exception', () => {
        const error = new Error('logService error');
        logService.error = jest.fn().mockImplementation(() => {
            throw error;
        });

        expect(() => {
            logExceptionMiddleware(err, req, res, next);
        }).toThrow(error);

        expect(next).toHaveBeenCalledWith(err);
    });
});
