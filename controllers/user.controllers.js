const { User } = require('../dateBase');
const { passwordHasher } = require('../helpers');
const { responseConstants, statusCodesErr } = require('../constants');
const { userHelper } = require('../helpers');
const { dirConstants } = require('../constants')
const { fileDirBuilder } = require('../helpers')
module.exports = {
    createUser: async(req, res, next) => {
        try {
            const { photo } = req;
            const { password } = req.body;
            const hashedPassword = await passwordHasher.hash(password);
            const user = await User.create({...req.body, password: hashedPassword });

            const { _id } = user;

            if (photo) {
                const { finalPath, filePath } = await fileDirBuilder.buildFileDir(
                    photo.name,
                    _id,
                    dirConstants.USERS
                );

                await photo.mv(finalPath);

                await User.updateOne({ _id }, { photo: filePath });
            }
            res.status(statusCodesErr.CREATED).json(responseConstants.SUCCESS);
        } catch (e) {
            next(e);
        }
    },
    getUserById: async(req, res, next) => {
        try {
            const normalizedUser = userHelper.userNormalizator(req.user.toJSON());
            res.status(statusCodesErr.CREATED).json(normalizedUser);
        } catch (e) {
            next(e);
        }
    }


}