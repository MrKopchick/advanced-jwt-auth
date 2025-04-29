const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/auth/registration', body('email').isEmail(), body('password').isLength({min:5, max: 32}), UserController.registration);
router.post('/auth/login', UserController.login);
router.post('/auth/logout', UserController.logout);

router.get('/auth/activate/:link', UserController.activate);
router.get('/auth/refresh', UserController.refresh);

router.get('/auth/users', authMiddleware ,UserController.getUsers);

module.exports = router;
