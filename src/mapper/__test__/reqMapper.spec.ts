import reqMapper from '../../mapper/reqMapper';

const MOCK_INFO = {
    method: 'get',
    url: '/api/v1/test',
    body: { a: '1' },
    query: {}
};

const MOCK_PARAMS = {
    ...MOCK_INFO,
    a: 1,
    b: 2,
    c: 3
};

describe('reqMapper', () => {
    it('should return corrent interface info after called toServiceApiFromReq function', () => {
        const result =  reqMapper.toServiceApiFromReq(MOCK_PARAMS as any);
        expect(result).toEqual(MOCK_INFO);
    });
});
