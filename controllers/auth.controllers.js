const { userHelper } = require('../helpers');
const { errorMessages } = require('../errors');

module.exports = {

    login: async(req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new Error(errorMessages.WRONG_EMAIL_OR_PASS.message);
            }

            const normalizedUser = userHelper.userNormalizator(user.toJSON());

            res.json({

                user: normalizedUser
            });
        } catch (e) {
            next(e);
        }
    }
}