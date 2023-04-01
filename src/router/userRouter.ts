import express from 'express';
import Controllers from '../controller';
import * as userValidator from '@/middlewares/validator/userValidator';
import jwtServices from '@/services/jwtService';
const router = express.Router();

const { UserController } = Controllers;

router.get('/', jwtServices.verifyToken(true), UserController.getUserById);
// router.get('/list', jwtServices.verifyToken(true), UserController.getUsers);
// router.post('/register', userValidator.createUser, UserController.createUser);
// router.post('/login', userValidator.doLogin, UserController.doLogin);
// router.put('', jwtServices.verifyToken(true), userValidator.updateUser, UserController.updateUser);
// router.delete('', jwtServices.verifyToken(true), userValidator.removeUser, UserController.deleteUser);

export default { router };
