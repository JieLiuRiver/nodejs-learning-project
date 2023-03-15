import express from 'express';
import Controllers from '../controller';
import * as userValidator from '../middleware/validator/userValidator';
const router = express.Router();

const { UserController } = Controllers;

router.get('/', UserController.getUserById);
router.get('/list', UserController.getUsers);
router.post('', userValidator.createUser, UserController.createUser);
router.put('', userValidator.updateUser, UserController.updateUser);
router.delete('', UserController.deleteUser);

export default router;
