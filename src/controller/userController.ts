import { Request } from 'express';
import log from '@/services/logServices';
import ReqMapper from '@/mapper/reqMapper';
import UserService from '../services/userServices';

const getUserById = async (req: Request<any, any, {userid: string}>, res: any) => {
    try {
        const userid = req.query.userid;
        const user = await UserService.findUserById(userid as string);
        res.formatResponse(
            user ? 0 : -1,
            user ? null : `connot find user by id ${userid}`,
            user || null
        );
    } catch (error) {
        log.error({
            ...ReqMapper.toServiceApiFromReq(req),
            error
        });
    }
};

const getUsers = async (req: Request<any, any, any, {
    limit?: number,
    loginSubstring?: string
}>, res: any) => {
    try {
        const { loginSubstring, limit } = req.query;
        const users = await UserService.getUsers(limit, loginSubstring);
        res.formatResponse(
            0,
            null,
            users || []
        );
    } catch (error) {
        log.error({
            ...ReqMapper.toServiceApiFromReq(req as Request),
            error
        });
    }
};

const createUser = async (req: Request, res: any) => {
    try {
        const result = await UserService.insertUser(req.body);
        res.formatResponse(
            result?.status || 0,
            result?.message || null,
            {
                userid: result?.userid
            }
        );
    } catch (error) {
        log.error({
            ...ReqMapper.toServiceApiFromReq(req),
            error
        });
    }
};

const updateUser = async (req: Request, res: any) => {
    try {
        const result = await UserService.updateUser(req.body);
        res.formatResponse(
            result?.status || 0,
            result?.message || null
        );
    } catch (error) {
        log.error({
            ...ReqMapper.toServiceApiFromReq(req),
            error
        });
    }
};

const deleteUser = async (req: Request<{userid: string}>, res: any) => {
    try {
        const userid = req.body.userid;
        if (!userid) {
            res.formatResponse(
                0,
                'userid is required'
            );
        }
        const result = await UserService.removeUser(userid);
        res.formatResponse(
            result?.status,
            result?.message || null
        );
    } catch (error) {
        log.error({
            ...ReqMapper.toServiceApiFromReq(req),
            error
        });
    }
};

export default {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
