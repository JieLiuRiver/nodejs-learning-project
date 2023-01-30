import express from 'express';
import * as GroupValidator from '@/middlewares/validator/GroupValidator';
import Controllers from '../controller';
const router = express.Router();

const { GroupController } = Controllers;

router.post('', GroupValidator.createGroup, GroupController.createGroup);
router.get('/', GroupController.getGroupById);
router.get('/list', GroupController.getGroups);
router.put('', GroupValidator.updateGroup, GroupController.updateGroup);
router.delete('', GroupController.deleteGroup);

export default router;
