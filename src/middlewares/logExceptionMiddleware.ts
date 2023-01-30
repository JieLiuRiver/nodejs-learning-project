
import log from '@/services/logServices';
import { Request, Response, NextFunction } from '@/types/index';

export default function logApiMiddleware(req: Request<any>, res: Response, next: NextFunction) {
    process.on('uncaughtException', (err: Error) => {
        console.log();
        log.error(err);
        console.log();
    });
    process.on('unhandledRejection', (err) => {
        console.log();
        log.error(err);
        console.log();
    });
    next();
}
