var express = require('express');
const { getUser, createUser, loginUser, logout } = require('../controller/userController');
const { authenticateUser } = require('../middleware/authMiddleware');
var router = express.Router();

/* GET users listing. */
router.get('/',authenticateUser , getUser);
router.post('/register',createUser);
router.post('/login',loginUser);
router.post('/logout',logout);

module.exports = router;
