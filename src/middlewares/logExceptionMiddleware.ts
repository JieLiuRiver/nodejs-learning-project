
import log from '@/services/logServices';
import { Request, Response, NextFunction } from '@/types/index';

export default function logExceptionMiddleware(err: Error, req: Request<any>, res: Response, next: NextFunction) {
    log.error(err);
    next(err);
}
