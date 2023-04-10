import express from 'express';
import Controller from '../controller/userController';
import * as userValidator from '@/middlewares/validator/userValidator';
import jwtServices from '@/services/jwtService';
const router = express.Router();

router.get('/', jwtServices.verifyToken(true), Controller.getUserById);
router.get('/list', jwtServices.verifyToken(true), Controller.getUsers);
router.post('/register', userValidator.createUser, Controller.createUser);
router.post('/login', userValidator.doLogin, Controller.doLogin);
router.put('', jwtServices.verifyToken(true), userValidator.updateUser, Controller.updateUser);
router.delete('', jwtServices.verifyToken(true), userValidator.removeUser, Controller.deleteUser);

export default router;
