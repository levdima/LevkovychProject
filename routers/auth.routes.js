const router = require('express').Router();
const { authControllers } = require('../controllers');
const { authMiddlewares } = require('../midllewares');

router.post('/login',
    authMiddlewares.isLoginAndPasswordCorrect,
    authControllers.login);

module.exports = router;