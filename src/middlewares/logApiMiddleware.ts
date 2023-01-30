
import ReqMapper from '@/mapper/reqMapper';
import log from '@/services/logServices';
import { Request, Response, NextFunction } from '@/types/index';


export default function logApiMiddleware(req: Request<any>, res: Response, next: NextFunction) {
    console.log();
    log.info(ReqMapper.toServiceApiFromReq(req));
    console.log();
    next();
}
