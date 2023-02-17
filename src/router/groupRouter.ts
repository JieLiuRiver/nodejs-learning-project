import express from 'express';
import Controllers from '../controller';
import * as GroupValidator from '../middleware/validator/GroupValidator';
const router = express.Router();

const { GroupController } = Controllers;

router.post('', GroupValidator.createGroup, GroupController.createGroup);
router.get('/', GroupController.getGroupById);
router.get('/list', GroupController.getGroups);
router.put('', GroupValidator.updateGroup, GroupController.updateGroup);
router.delete('', GroupController.deleteGroup);

export default router;
