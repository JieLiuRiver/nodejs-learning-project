import { Request } from 'express';
import GroupService from '../services/groupServices';
import { GroupType } from '../types';

const createGroup = async (req: Request<any, Omit<GroupType, 'id'> & {
    userIds?: string[]
}>, res: any) => {
    const result = await GroupService.createGroup(req.body);
    res.formatResponse(
        result?.status,
        result?.message,
        {
            Groupid: result?.groupid
        }
    );
};

const getGroupById = async (req: Request<any, any, {groupid: string}>, res: any) => {
    const groupid = req.query.groupid;
    const Group = await GroupService.findGroupById(groupid as string);
    res.formatResponse(
        Group ? 0 : -1,
        Group ? null : `connot find group by id ${groupid}`,
        Group || null
    );
};

const getGroups = async (req: Request, res: any) => {
    const Groups = await GroupService.getGroups();
    res.formatResponse(
        0,
        null,
        Groups || []
    );
};

const updateGroup = async (req: Request, res: any) => {
    const result = await GroupService.updateGroup(req.body);
    res.formatResponse(
        result?.status,
        result?.message,
        null
    );
};

const deleteGroup = async (req: Request<{Groupid: string}>, res: any) => {
    const groupid = req.body.groupid;
    if (!groupid) {
        res.formatResponse(
            0,
            'groupid is required',
            null
        );
    }
    const result = await GroupService.removeGroup(groupid);
    res.formatResponse(
        result?.status,
        result?.message,
        null
    );
};

export default {
    createGroup,
    getGroupById,
    getGroups,
    updateGroup,
    deleteGroup
};
