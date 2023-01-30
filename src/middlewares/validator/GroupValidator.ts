import { body, query } from 'express-validator';
import validate from './validate';

const getValidators = (type: 'add' | 'update') => {
    const results = [];
    const isAddType = type === 'add';
    if (isAddType) {
        results.push(
            body('name').notEmpty().withMessage('name is required').bail(),
            body('permissions').isArray().withMessage('permissions is a array type').bail()
        );
    }
    return results;
};

export const createGroup = validate(getValidators('add').filter(Boolean));

export const getGroup = validate(
    [
        query('groupid').notEmpty().withMessage('groupid is required').bail()
    ]
);

export const updateGroup = validate([
    body('id').notEmpty().withMessage('id is required').bail(),
    ...getValidators('update').filter(Boolean)
]);

export const updateGroupContainUsers = validate([
    body('groupid').notEmpty().withMessage('groupid is required').bail(),
    body('userids').notEmpty().withMessage('userids is required').bail()
]);

export const deleteGroup = validate([
    body('groupid').notEmpty().withMessage('groupid is required').bail()
]);
