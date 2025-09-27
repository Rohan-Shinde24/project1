const user = require('../controllers/userController');
const {authMiddleware,adminMiddleware} = require("../middlewares/authMiddleware")
const express = require('express');
const router = express.Router();


router.post('/register', user.registerUser);
router.post('/login', user.loginUser);
router.put('/updateProfile', authMiddleware,  user.updateProfile);
router.get("/alluser", authMiddleware, adminMiddleware, user.getallUser);
router.post("/deleatuser", authMiddleware, adminMiddleware, user.deleatUser);

module.exports = router;
