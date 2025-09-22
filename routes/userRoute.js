const user = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.post('/register', user.registerUser);
router.post('/login', user.loginUser);

module.exports = router;
