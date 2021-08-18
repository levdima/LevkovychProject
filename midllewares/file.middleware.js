const {
    constants: {
        PHOTOS_MIMETYPES,
        PHOTO_MAX_SIZE,

    },
    statusCodesErr
} = require('../constants');
const { ErrorHandler, errorMessages } = require('../errors');

module.exports = {
    chekFiles: (req, res, next) => {
        try {
            if (!req.files) {
                next();
            } else {
                const files = Object.values(req.files);

                if (!files) {
                    next();
                }
                const photos = [];

                for (let i = 0; i < files.length; i++) {
                    const { size, mimetype } = files[i];

                    if (PHOTOS_MIMETYPES.includes(mimetype)) {
                        if (size > PHOTO_MAX_SIZE) {
                            throw new ErrorHandler(
                                statusCodesErr.TOO_BIG_FILE,
                                errorMessages.TOO_BIG_FILE.message,
                                errorMessages.TOO_BIG_FILE.code
                            );
                        }

                        photos.push(files[i]);
                    }
                }
                req.photos = photos;

                next();
            }
        } catch (e) {
            next(e);
        }
    },

    checkPhoto: (req, res, next) => {
        try {
            if (!req.photos) {
                next();
            } else {
                if (req.photos.length > 1) {
                    throw new ErrorHandler(
                        statusCodesErr.ONLY_ONE_FILE_PER_TIME,
                        errorMessages.ONLY_ONE_FILE_PER_TIME.message,
                        errorMessages.ONLY_ONE_FILE_PER_TIME.code
                    );
                }

                [req.photo] = req.photos;

                next();
            }
        } catch (e) {
            next(e);
        }
    },
};