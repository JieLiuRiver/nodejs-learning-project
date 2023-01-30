import jwt from 'jsonwebtoken';
import config from '@/config';
import { JWTUserInfo, NextFunction, Request, Response } from '@/types';

const verifyPromise = (token: string) => new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt_key, (err, decoded) => {
        if (err) {
            reject(err);
        }
        resolve(decoded);
    });
});

class JWTServices {
    createToken(userinfo: JWTUserInfo): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign({ userinfo }, config.jwt_key, { expiresIn: config.token_expires }, (err, token) => {
                if (err) {
                    reject(err);
                }
                resolve(token || '');
            });
        });
    }

    verifyToken(required: boolean = true) {
        return async (req: Request, res: Response, next:  NextFunction) => {
            let token = req.headers[config.token_headers_field];
            token = token && typeof token === 'string' ? token.split(`${config.jwt_prefix} `)[1] : '';
            if (token) {
                try {
                    const userinfo = await verifyPromise(token);
                    (req as any).userinfo = userinfo;
                    // eslint-disable-next-line callback-return
                    next();
                } catch (error) {
                    res.status(403).json({
                        code: 0,
                        message: 'forbidden'
                    });
                }
            } else if (required) {
                res.status(401).json({
                    code: 0,
                    message: 'unauthorized'
                });
            } else {
                // eslint-disable-next-line callback-return
                next();
            }
        };
    }
}


export default new JWTServices();
