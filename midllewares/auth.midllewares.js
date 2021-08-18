const { statusCodesErr } = require('../constants');
const { User } = require('../dateBase');
const { ErrorHandler, errorMessages } = require('../errors');
const { passwordHasher } = require('../helpers');


module.exports = {
    isLoginAndPasswordCorrect: async(req, res, next) => {
        try {
            const { password, email } = req.body;

            const userByEmail = await User.findOne({ email }).select('+password');

            if (!userByEmail) {
                throw new ErrorHandler(statusCodesErr.INCORRECT_REQUEST,
                    errorMessages.WRONG_EMAIL_OR_PASS.message,
                    errorMessages.WRONG_EMAIL_OR_PASS.code);
            }

            await passwordHasher.compare(userByEmail.password, password);

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    }
}