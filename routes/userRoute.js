const user = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const express = require('express');
const router = express.Router();

router.post('/register', user.registerUser);
router.post('/login', user.loginUser);
router.post("/forgotpassword", user.forgoatPassword)
router.post("/resetpassword", user.resetPassword)

module.exports = router;
