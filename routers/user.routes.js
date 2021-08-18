const router = require('express').Router();
const { userControllers } = require('../controllers');
const { userMiddlewares, fileMiddlewares } = require('../midllewares')
router.post('/',
    fileMiddlewares.chekFiles,
    fileMiddlewares.checkPhoto,
    userMiddlewares.isDataCorrect,
    userMiddlewares.isEmailAlreadyExist,
    userControllers.createUser);
router.get('/:id',
    userMiddlewares.isUserExist,
    userControllers.getUserById)
module.exports = router;