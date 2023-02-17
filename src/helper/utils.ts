
export const toUsers = (users: any[]) => {
    return users.map((user) => ({
        ...user.dataValues
    }));
};
