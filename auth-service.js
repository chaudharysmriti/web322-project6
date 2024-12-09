const bcrypt = require('bcryptjs');
const users = [];

const registerUser = async (userInfo) => {
    try {
        const existingUser = users.find(user => user.username === userInfo.username);
        if (existingUser) {
            throw 'User already exists!';
        }

        const hashedPassword = await bcrypt.hash(userInfo.password, 10);
        const newUser = {
            username: userInfo.username,
            password: hashedPassword,
        };

        users.push(newUser);
    } catch (err) {
        throw err;
    }
};

const checkUser = async (loginInfo) => {
    try {
        const user = users.find(user => user.username === loginInfo.username);
        if (!user) {
            throw 'User not found!';
        }

        const isMatch = await bcrypt.compare(loginInfo.password, user.password);
        if (!isMatch) {
            throw 'Invalid password!';
        }

        return user;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    registerUser,
    checkUser,
};
