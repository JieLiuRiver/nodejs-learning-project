import express from 'express';
import User from './userRouter';
import Group from './groupRouter';

const router = express.Router();
router.use('/user', User);
router.use('/group', Group);


export default router;
