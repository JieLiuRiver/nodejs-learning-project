const util = require('util');
const fs = require('fs');
const path = require('path');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const COUNT_FILE_PATH = path.join(__dirname, './count.txt');

module.exports = class Counter {
    static async count() {
        try {
            const fileData = await readFile(COUNT_FILE_PATH, 'utf8');
            return Number(fileData);
        } catch (err) {
            throw new Error(err);
        }
    }

    static async increase() {
        try {
            let count = await Counter.count();
            count++;
            await writeFile(COUNT_FILE_PATH, `${count}`);
            return count;
        } catch (err) {
            throw new Error(err);
        }
    }

    static async reset() {
        try {
            await writeFile(COUNT_FILE_PATH, '0');
            return 0;
        } catch (err) {
            throw new Error(err);
        }
    }
};
