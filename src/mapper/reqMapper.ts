import { Request } from '@/types';

export default class ReqMapper {
    static toServiceApiFromReq(req: Request<any>) {
        return {
            method: req.method,
            url: req.url,
            body: req.body,
            query: req.query
        };
    }
}
