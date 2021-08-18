const bcrypt = require('bcrypt');
const { errorMessages } = require('../errors');

module.exports = {
    compare: async(hashedPassword, password) => {
        const isPasswordMatched = await bcrypt.compare(password, hashedPassword);

        if (!isPasswordMatched) {
            throw new Error(errorMessages.WRONG_EMAIL_OR_PASS);
        }
    },

    hash: (password) => bcrypt.hash(password, 10)
};