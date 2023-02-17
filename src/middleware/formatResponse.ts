
import { Request, NextFunction } from '../types';

const formatResponse = (req: Request, res: any, next: NextFunction) => {
    res.formatResponse = (code: number, message: string | null, data: any | null = null) => {
        res.status(200).json({ code, message, data });
    };
    next();
};

export default formatResponse;
