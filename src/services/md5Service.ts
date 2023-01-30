import { hashSync, compareSync } from 'bcryptjs';


class Md5Service {
    createHash(str: string) {
        return hashSync(str, 10);
    }
    async compareHash(strNew: string, strOld: string) {
        return await compareSync(strNew, strOld);
    }
}


export default new Md5Service();
