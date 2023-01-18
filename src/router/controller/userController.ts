import { Request } from 'express';
import UserService from '../../services/userServices';

const getUserById = async (req: Request<{userid: string}>, res: any) => {
    const userid = req.params.userid;
    const user = await UserService.findUserById(userid);
    res.formatResponse(
        user ? 0 : -1,
        user ? null : `connot find user by id ${userid}`,
        user || null
    );
};

const getUsers = async (req: Request<any, any, any, {
    limit?: number,
    loginSubstring?: string
}>, res: any) => {
    const { loginSubstring, limit } = req.query;
    const users = await UserService.getUsers(limit, loginSubstring);
    res.formatResponse(
        0,
        null,
        users || []
    );
};

const createUser = async (req: Request, res: any) => {
    const result = await UserService.insertUser(req.body);
    res.formatResponse(
        result?.status || 0,
        result?.message || null,
        {
            userid: result?.userid
        }
    );
};

const updateUser = async (req: Request, res: any) => {
    const result = await UserService.updateUser(req.body);
    res.formatResponse(
        result?.status || 0,
        result?.message || null
    );
};

const deleteUser = async (req: Request<{userid: string}>, res: any) => {
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
};

export default {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
