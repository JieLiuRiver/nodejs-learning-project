
import path from 'path';
import { promisify } from 'util';
import fs from 'fs';
import { User } from '../types/index';

const writeFile = promisify(fs.writeFile);

export const USERS_DB_FILE_PATH = path.join(__dirname, '../db/users.json');

export const writeUsers = async (users: User[], fallback?: () => void) => {
    try {
        await writeFile(USERS_DB_FILE_PATH, JSON.stringify(users));
    } catch (error) {
        console.log(error);
        fallback?.();
    }
};

