const bcrypt = require('bcrypt');

const saltRounds = 12; 

const hashPassword = async (password) => {
    const password_hash = await bcrypt.hash(password, saltRounds);
    return password_hash;
};

module.exports = {
    hashPassword
};
