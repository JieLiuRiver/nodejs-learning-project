import formatResponse from '../formatResponse';

describe('formatResponse middleware', () => {
    it('should add formatResponse function to response object', () => {
        const req: any = {};
        const res: any = {};
        const next = jest.fn();

        formatResponse(req, res, next);

        expect(res.formatResponse).toBeDefined();
        expect(typeof res.formatResponse).toBe('function');
    });
});
