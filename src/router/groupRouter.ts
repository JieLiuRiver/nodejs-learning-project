import express from 'express';
import * as GroupValidator from '@/middlewares/validator/GroupValidator';
import jwtServices from '@/services/jwtServices';
import Controllers from '../controller';

const router = express.Router();

const { GroupController } = Controllers;

router.post('', jwtServices.verifyToken(true), GroupValidator.createGroup, GroupController.createGroup);
router.get('/', jwtServices.verifyToken(true), GroupController.getGroupById);
router.get('/list', jwtServices.verifyToken(true), GroupController.getGroups);
router.put('', jwtServices.verifyToken(true), GroupValidator.updateGroup, GroupController.updateGroup);
router.delete('', jwtServices.verifyToken(true), GroupValidator.deleteGroup, GroupController.deleteGroup);
router.put('/users', jwtServices.verifyToken(true), GroupValidator.updateGroupContainUsers, GroupController.updateGroupContainUsers);

export default router;
