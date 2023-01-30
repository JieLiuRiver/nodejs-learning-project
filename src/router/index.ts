import express from 'express';
import User from './userRouter';
import Group from './groupRouter';

const router = express.Router();
router.use('/user', User);
router.use('/group', Group);

// just for test
/*
router.get('/simulateException', () => {
    const asyncError = () => {
        setTimeout(() => {
            throw new Error('Async Error');
        }, 100);
    };
    asyncError();
});
*/

export default router;
