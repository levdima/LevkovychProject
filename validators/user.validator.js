const Joi = require('joi');

const { regexp } = require('../constants');

module.exports = {
    createUser: Joi.object().keys({
        name: Joi.string().required().min(3).max(50),
        surname: Joi.string().required().min(3).max(50),
        email: Joi.string().regex(regexp.EMAIL_REGEXP),
        password: Joi.string().min(8).max(256).required()

    })
};