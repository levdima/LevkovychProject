const fs = require('fs');
const path = require('path');
const uuid = require('uuid').v1;
const util = require('util');

const { dirConstants } = require('../constants');

const mkdirPromise = util.promisify(fs.mkdir);

module.exports = {
    buildFileDir: async(fileName, itemId, itemType) => {
        const pathWithoutPublic = path.join(itemType, itemId.toLocaleString(), 'photos');
        const photoDirectory = path.join(process.cwd(), dirConstants.PUBLIC, pathWithoutPublic);

        const fileExtension = fileName.split('.').pop();
        const photoName = `${uuid()}.${fileExtension}`;

        const finalPath = path.join(photoDirectory, photoName);

        await mkdirPromise(photoDirectory, { recursive: true });

        return {
            finalPath,
            filePath: path.join(pathWithoutPublic)
        };
    }
};