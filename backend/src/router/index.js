const { Router } = require('express');


const router = new Router();

router.post('/auth/registration');
router.post('/auth/login');
router.post('/auth/logout');

router.get('/auth/activation/:link');
router.get('/auth/refresh');

router.get('/auth/users');

module.exports = router;