const { User } = require('../dateBase');
const { statusCodesErr } = require('../constants');
const { ErrorHandler, errorMessages } = require('../errors');
const { userValidator } = require('../validators');

module.exports = {
    isUserExist: async(req, res, next) => {
        try {
            const usersById = await User.findById(req.params.id);

            if (!usersById) {
                throw new ErrorHandler(statusCodesErr.INCORRECT_REQUEST,
                    errorMessages.USER_NOT_EXIST.message,
                    errorMessages.USER_NOT_EXIST.code);
            }

            req.user = usersById;

            next();
        } catch (e) {
            next(e);
        }
    },

    isDataCorrect: (req, res, next) => {
        try {
            const { error } = userValidator.createUser.validate(req.body);

            if (error) {
                throw new ErrorHandler(statusCodesErr.INCORRECT_REQUEST,
                    errorMessages.INCORRECT_DATA.message,
                    errorMessages.INCORRECT_DATA.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isEmailAlreadyExist: async(req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await User.findOne({ email });

            if (userByEmail) {
                throw new ErrorHandler(statusCodesErr.INCORRECT_REQUEST,
                    errorMessages.USER_ALREADY_EXIST.message,
                    errorMessages.USER_ALREADY_EXIST.code);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};