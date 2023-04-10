import groupMapper from '../../mapper/GroupMapper';


const PERMISSIONS = ['READ', 'DELETE'];

const MOCK_INFO = {
    group: {
        id: 'id1',
        name: 'group1'
    },
    permissions: PERMISSIONS
};

describe('groupMapper', () => {
    it('should return groups after called toUsers function', () => {
        const groups =  groupMapper.toGroups([
            {
                dataValues: MOCK_INFO.group
            },
            {
                dataValues: MOCK_INFO.group
            }
        ]);
        expect(groups).toEqual([MOCK_INFO.group, MOCK_INFO.group]);
    });

    it('should return correct interface info after called toGroupWithPermission function', () => {
        const result =  groupMapper.toGroupWithPermission(MOCK_INFO as any);
        expect(result.permissions).toEqual(String(PERMISSIONS));
    });
});
