import Md5Service from '../../services/md5Service';

describe('createHash', () => {
    it('should create a new hash from a string', () => {
        const str = 'test';
        const hash = Md5Service.createHash(str);
        expect(hash).toBeDefined();
    });
});


describe('compareHash', () => {
    it('should return true for matching hashes', async () => {
        const str = 'test';
        const hash = Md5Service.createHash(str);
        const result = await Md5Service.compareHash(str, hash);
        expect(result).toBe(true);
    });

    it('should return false for non-matching hashes', async () => {
        const str = 'test';
        const hash = Md5Service.createHash('other');
        const result = await Md5Service.compareHash(str, hash);
        expect(result).toBe(false);
    });
});
