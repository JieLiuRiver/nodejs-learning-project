import { body } from 'express-validator';
import validate from '../../validator/validate';

describe('validate middleware', () => {
    it('should call next if validation passes', async () => {
        const req: any = {
            body: {
                name: 'John',
                age: 20
            }
        };
        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();
        const validator = [
            body('name').isString().notEmpty(),
            body('age').isInt()
        ];
        await validate(validator)(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});
