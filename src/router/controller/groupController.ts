import { Request, Response } from 'express';
import GroupService from '@/services/groupServices';
import log from '@/services/logServices';
import ReqMapper from '@/mapper/reqMapper';
import { GroupType } from '@/types/index';

const createGroup = async (req: Request<any, Omit<GroupType, 'id'> & {
    userIds?: string[]
}>, res: any) => {
    try {
        const result = await GroupService.createGroup(req.body);
        res.formatResponse(
            result?.status,
            result?.message,
            {
                Groupid: result?.groupid
            }
        );
    } catch (error) {
        log.error({
            ...ReqMapper.toServiceApiFromReq(req),
            error
        });
    }
};

const getGroupById = async (req: Request<any, any, {groupid: string}>, res: any) => {
    try {
        const groupid = req.query.groupid;
        const Group = await GroupService.findGroupById(groupid as string);
        res.formatResponse(
            Group ? 0 : -1,
            Group ? null : `connot find group by id ${groupid}`,
            Group || null
        );
    } catch (error) {
        log.error({
            ...ReqMapper.toServiceApiFromReq(req),
            error
        });
    }
};

const getGroups = async (req: Request, res: any) => {
    try {
        const Groups = await GroupService.getGroups();
        res.formatResponse(
            0,
            null,
            Groups || []
        );
    } catch (error) {
        log.error({
            ...ReqMapper.toServiceApiFromReq(req),
            error
        });
    }
};

const updateGroup = async (req: Request, res: any) => {
    try {
        const result = await GroupService.updateGroup(req.body);
        res.formatResponse(
            result?.status,
            result?.message,
            null
        );
    } catch (error) {
        log.error({
            ...ReqMapper.toServiceApiFromReq(req),
            error
        });
    }
};

const deleteGroup = async (req: Request<{groupid: string}>, res: any) => {
    try {
        const groupid = req.body.groupid;
        const result = await GroupService.removeGroup(groupid);
        res.formatResponse(
            result?.status,
            result?.message,
            null
        );
    } catch (error) {
        log.error({
            ...ReqMapper.toServiceApiFromReq(req),
            error
        });
    }
};


const updateGroupContainUsers = async (req: Request, res: any) => {
    try {
        const { groupid, userids } = req.body;
        if (!Array.isArray(userids) || !userids?.length) {
            res.formatResponse(
                0,
                'userids is required',
                null
            );
        }
        const result = await GroupService.updateGroupContainUsers(groupid, userids);
        res.formatResponse(
            result?.status,
            result?.message,
            null
        );
    } catch (error) {
        log.error({
            ...ReqMapper.toServiceApiFromReq(req),
            error
        });
    }
};

export default {
    createGroup,
    getGroupById,
    getGroups,
    updateGroup,
    deleteGroup,
    updateGroupContainUsers
};
